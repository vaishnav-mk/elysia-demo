<script>
  export let data;
  let name;
  let email;

  async function updateContact(e) {
    const response = await fetch(
      `http://localhost:3000/contacts/${data}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    console.log({ res });
  }
</script>

<input type="checkbox" id="edit-modal" class="modal-toggle" />

<div class="modal">
  <div class="modal-box bg-neutral-900">
    <div
      class="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-700/40 text-black font-semibold bg-base-800 hover:bg-neutral-200 hover:dark:bg-neutral-700 transition-colors duration-200"
    >
      <input
        type="number"
        placeholder="Phone number to change"
        class="input w-full max-w-xs"
        bind:value={data}
      />
    </div>
    <div class="flex flex-row gap-2 mt-2">
      <div
        class="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-700/40 text-black font-semibold bg-base-800"
      >
        <input
          type="text"
          placeholder="New Name here"
          class="input w-full max-w-xs"
          bind:value={name}
        />
      </div>
      <div
        class="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-700/40 text-black font-semibold bg-base-800"
      >
        <input
          type="text"
          placeholder="New E-Mail here"
          class="input w-full max-w-xs"
          bind:value={email}
        />
      </div>
    </div>

    <div class="modal-action">
      <label for="edit-modal" class="btn" on:click={updateContact}>update</label
      >
    </div>
  </div>
</div>
