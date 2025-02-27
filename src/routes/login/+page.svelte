<script>
    import { goto } from "$app/navigation";
    import { enhance } from "$app/forms";
    import { logged } from "$lib/stores/session.svelte.js";
    import { Toast } from "flowbite-svelte";

    let {data, form} = $props()    
    let logging = $state(false)

</script>

<div class='flex-col justify-center text-center'>
    <h1 class="underline text-xl m-2"> Log in to access the game </h1>


<form  action="?/login" method="post" class="flex-col justify-items-center p-10"
    use:enhance={(({formElement, formData})=>{
        logging = true; 
        return async ({result, update}) => {
            await update(); 
            logging = false;
            if (result?.data.success) {
              formElement.reset()
              logged.update(l => !l)
              goto('/dashboard')
            }

            
        };
    })}>
    <label> Username : 
        <input
         type="text"
         name="username"
         autocomplete='off'
         placeholder="username"
         required
        />
        </label>
        <label> Password : 
            <input
             type="password"
             name="password"
             autocomplete='off'
             placeholder='password'
             required
            />
            </label>
    <button disabled={logging} > Connexion </button>
</form>

{#if logging }
<span class="logging"> logging...</span>        
{/if}


{#if form?.error}

<Toast on:close={() => registered = !registered} >
    <p class="text-red-600"> {form.error}</p>
</Toast>
{/if}

{#if form?.success}
<p> Logged ! </p>
{/if}

</div>


<style>

    form {
        border-radius: 10px;
        background: wheat ;
    }

    label {
        background-color :burlywood ;
        padding: 8px;
        margin: 5px;
        border-radius: 5px;
    }

    input {
        background-color: white;
    }

    button {
        background-color :burlywood ;
        padding: 5px;
        border-radius: 5px ;
    }
    button:hover {
        opacity: 70%;
        cursor :pointer ; 
    }
</style>