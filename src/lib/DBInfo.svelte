<script lang="ts">
    export let info: DatabaseInfo;

    function getSize(bytes?: number) {
        if (bytes) {
            const kb = bytes / 1000;
            if (kb > 1000) {
                return Math.floor(kb / 1000) + 'mb';
            } else {
                return Math.floor(kb) + 'kb';
            }
        } else {
            return '0 bytes';
        }
    }
</script>

<div class="db-info">
    <div>
        <span class="title">DB size:</span>
        <span>{getSize(info.databaseSizeBytes)}</span>
    </div>

    <div>
        <span class="title">Storage type:</span>
        <span>{info.storageType}</span>
    </div>
</div>

<style>
    .db-info {
        margin: 2rem 0;
    }

    .db-info > div {
        display: flex;
        gap: 0.5rem;
        margin: 0.25rem 0;
    }

    .title {
        font-weight: 500;
    }
</style>
