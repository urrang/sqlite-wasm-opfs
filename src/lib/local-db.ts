import { SQLocal } from 'sqlocal';
import { writable } from 'svelte/store';

export let db: SQLocal;

class LocalDB {
    private db?: SQLocal;
    databaseInfo = writable<DatabaseInfo | undefined>();

    async init() {
        if (!this.db) {
            // Request permission to persist files in OPFS (missing rejection handler)
            await navigator.storage.persist();

            // Create db file in opfs if it doesn't already exist
            const fsRoot = await navigator.storage.getDirectory();
            await fsRoot.getFileHandle('local.db', { create: true });

            // Init SQLocal
            db = new SQLocal({ databasePath: 'local.db' });
        }

        this.setDatabaseInfo();
    }

    async download() {
        // Download database file from server and overwrite the local db
        const res = await fetch('db.sqlite');
        await db.overwriteDatabaseFile(await res.blob());

        this.setDatabaseInfo();
    }

    async delete() {
        const fsRoot = await navigator.storage.getDirectory();
        await fsRoot.removeEntry('local.db');
        this.db = undefined;
        this.init();
    }

    async query(template: string, ...params: unknown[]) {
        return db.sql(template, ...params);
    }

    private async setDatabaseInfo() {
        const meta = await db.getDatabaseInfo();
        if (meta.databaseSizeBytes) {
            this.databaseInfo.set(meta);
        } else {
            this.databaseInfo.set(undefined);
        }
    }
}

export const localDB = new LocalDB();

export const EXAMPLE_QUERY = `SELECT 
    id,
    account_id,
    account_description,
    opening_debit_balance,
    closing_debit_balance,
    opening_credit_balance,
    closing_credit_balance

FROM account`;
