# Other options

-   Web SQL (deprecated and removed)
-   IndexedDB

# Wrapper libraries

-   Official SQLite WASM build
-   SQL.js
-   wa.sqlite
-   absurd-sql
-   SQLocal

# (Virtual) File system

-   In memory (no persistence)
-   OPFS (Origin Private File System)
-   IndexedDB

# Asynchronous calls

SQLite is implemented using synchronous operations with the file system.
This is a problem because in javascript, file system operations are
typically asynchronous.

Multiple workarounds for this exist, and browser support and performance varies a lot between them.
A browser native solution (JSPI) is in the works, but far from stable.

# Concurrency

OPFS doesn't have graceful handling of concurrency.
If multiple web workers (e.g your app is open in multiple tabs, each spawning a worker)
writes to the database at the same time you're likely to run into corruption issues.

A workaround for this is to ensure that only the current active tab writes.
This is possible by sending queries to a SharedWorker which redirects to the current
active tab's worker.

# Encryption

SQLite Encryption Extension is a paid product, and even with a license you're
not allowed to use WASM builds of it on public facing sites, only intranet apps.

The SQLite team says:

Encryption is arguably redundant for the persistent storage options because the underlying data
is locked away in browser-specific storage. The argument could be made that anyone with direct access
to a given user's login and browser can read the content, but the counter-argument of
"physical access trumps all security measures" also applies"

# LibSQL

Fork of SQLite that is open source and open contribution.
Has free and open source encryption support.
Experimental WASM build for browsers.
