<script>
  export let data;
  console.log({ data });

  async function deleteContact(e) {
    const response = await fetch(`http://localhost:3000/contacts/${data}`, {
      method: "DELETE",
    });
    const res = await response.json();
    console.log({ res });
  }
</script>

<input type="checkbox" id="delete-modal" class="modal-toggle" />

<div class="modal">
  <div class="modal-box bg-neutral-900">
    <div class="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>You are about to delete <span class="font-bold">{data}</span></span>
      </div>
    </div>

    <div class="modal-action">
      <label for="delete-modal" class="btn btn-error" on:click={deleteContact}
        >delete</label
      >
    </div>
  </div>
</div>
