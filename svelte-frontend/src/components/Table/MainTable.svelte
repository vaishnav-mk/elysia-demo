<script>
  import EditModal from "../Modal/EditModal.svelte";
  import DeleteModal from "../Modal/DeleteModal.svelte";
  export let data;
  export const { contacts } = data;
</script>

<div
  class="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-700/40"
>
  <h2 class="text-base font-semibold text-neutral-900 dark:text-neutral-100">
    Contact Details
  </h2>
  <ol class="mt-6 space-y-2">
    {#each contacts as { phoneNumber, name, email }}
      <li>
        <div class="flex flex-row">
          <div
            class="flex justify-between items-center p-2 group cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-700 transition-colors duration-200 rounded-lg w-full"
          >
            <div
              class="flex items-center justify-center p-2 rounded-lg bg-neutral-700 group-hover:bg-neutral-700 gap-2 pr-5"
            >
              <div class="p-2 rounded-full bg-neutral-600">
                <img class="w-6 h-6" src="favicon.png" alt="balls" />
              </div>
              <span
                class="text-md font-bold text-neutral-700 dark:text-neutral-200"
              >
                {name}
              </span>
            </div>
            <div class="flex items-center">
              <div
                class="mr-2 p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-600 transition-colors duration-200"
              >
                <img class="w-6 h-6" src="favicon.png" alt="balls" />
              </div>
              <span
                class="text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                {phoneNumber}
              </span>
            </div>
            <div class="flex items-center">
              <div
                class="mr-2 p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-600 transition-colors duration-200"
              >
                <img class="w-6 h-6" src="favicon.png" alt="balls" />
              </div>
              <span
                class="text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                {email}
              </span>
            </div>
            <div class="btn-group btn-group-vertical lg:btn-group-horizontal">
              <label for="edit-modal" class="btn btn-sm">edit</label>
              <label for="delete-modal" class="btn btn-error btn-sm"
                >delete</label
              >
            </div>
          </div>
        </div>
      </li>
      <EditModal data={phoneNumber} />
      <DeleteModal data={phoneNumber} />
    {/each}
  </ol>
</div>
