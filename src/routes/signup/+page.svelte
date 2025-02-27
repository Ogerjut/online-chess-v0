<script>
    import { enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
    import { Toast } from 'flowbite-svelte';
    import { AddressBookSolid, CheckCircleOutline } from "flowbite-svelte-icons";
    
    let {data, form} = $props()    
    let registering = $state(false)
    
</script>

    <p>Already signed up  ? <a href="/login">Connect you here </a>!</p>

    <div class="flex-col justify-items-center items-center text-center">
        <h1 class="underline text-xl m-2 "> Create a new account ! </h1>
    
        <form action="?/register" method="POST" class="flex justify-center p-10 " 
        use:enhance={(({formElement})=>{
            registering = true;
            
            return async ({update}) => {
                await update();
                registering = false;
                formElement.reset()
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
    
            <!-- <label for="">
                Email :
                <input type="email" name="email" id="">
            </label> -->
            <label >
                Password : 
                <input
                type="password"
                name="password"
                autocomplete='off'
                placeholder="password"
                required
                />
            </label>
            
            <!-- <label for=""> Repeat password : </label>
            <input
             type="text"
             name="mdp"
             autocomplete='off'
             placeholder="password"
             required
            /> -->
            <button disabled={registering}> Register </button>
        </form>


    {#if registering }
        <span class="saving"> saving your datas...</span>        
    {/if}
    

    {#if form?.error}
        <Toast >
            <AddressBookSolid slot='icon' class='w-6 h-6'/>
            <p class="text-red-600"> {form.error}</p>
        </Toast>
    {/if}

    {#if form?.success}
        <Toast >
            <CheckCircleOutline slot='icon' class='w-6 h-6'/>
            <div> Registered, you can now log in  </div>
        </Toast>
    
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