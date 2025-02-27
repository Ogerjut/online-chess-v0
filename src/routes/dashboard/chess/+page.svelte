
<script>
    import { goto } from "$app/navigation";

    let {data} = $props()
    let searching = $state(false);

    async function joinTable() {
        searching = true;

        const res = await fetch("/dashboard/chess", {
            method: "POST",
            body: JSON.stringify({ playerId: data.user._id }) 
        });

        const dataResponse = await res.json();

        if (dataResponse) {
            console.log(dataResponse.message)
            console.log(dataResponse)
            searching = false
            goto(`/dashboard/chess/${dataResponse.table}`);
        } 
    }
</script>

<h1> Stay tuned for online chess game </h1>

<button onclick={joinTable} disabled={searching}>
    {searching ? "Recherche d'un adversaire..." : "Rejoindre l'échiquier"}
</button>




