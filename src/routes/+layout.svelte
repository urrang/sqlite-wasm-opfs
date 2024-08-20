<script lang="ts">
    import '../styles.css';
</script>

<svelte:head>
    <title>SQLite in the browser</title>
</svelte:head>

<main>
    <slot />
</main>

<style>
    main {
        max-width: 1400px;
        margin: 2rem auto;
        padding: 0 2rem;
    }
</style>
