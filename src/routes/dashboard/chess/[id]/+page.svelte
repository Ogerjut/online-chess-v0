<script>
    import { goto, invalidate } from '$app/navigation';

    let { data } = $props();

    let table = $state(data.table)
    let opponent = $state(null);

    console.log('DATAS : ', data);

    // Vérifie si la table est prête et attribue l'adversaire
    function checkOpponent() {
        if (table && table.ready) {
            opponent = data.players.find(p => p.username !== data.user.username);
        }
    }

    checkOpponent(); // Vérification initiale

    // Effet réactif pour surveiller les mises à jour de la table
    $effect(() => {
        if (!table.ready) {
            const intervalId = setInterval(async () => {
                const res = await fetch(`/dashboard/chess/${table._id}`);
                const updatedData = await res.json();

                console.log("updated data : ",updatedData)

                if (updatedData.success) {
                    table = updatedData.table;
                    data.players = updatedData.players;
                    checkOpponent();
                    
                    // Arrêter le polling si la table est prête
                    if (table.ready) {
                        console.log("table prête, arreter le polling")
                        clearInterval(intervalId);
                    }
                } else {
                    console.log(updatedData.message)
                }
            }, 3000);

            return () => clearInterval(intervalId); // Nettoyage lors du démontage du composant
        }
    });


    async function leaveTable() {
        const res = await fetch(`/dashboard/chess/${table._id}`, {
            method: "POST",
            body: JSON.stringify({ playerId: data.user._id }) 
        });

        const dataResponse = await res.json();
        if (dataResponse.success) {
            console.log(dataResponse.message)
            goto(`/dashboard/chess`);
        }
    }
</script>

<h1> Table : {data.table._id} </h1>

{#if table.ready} 
    <p> You : {data.user.username} vs {opponent?.username} </p>
{:else}
    <p> Waiting for an opponent... </p>
{/if}

<button onclick={leaveTable}>Leave the table</button>

<style>
    button {
        background-color: rgb(230, 28, 28);
        border-radius: 15px;
        padding: 5px;
        margin: 3px;
    }
    button:hover {
        opacity: 75%;
    }
</style>
