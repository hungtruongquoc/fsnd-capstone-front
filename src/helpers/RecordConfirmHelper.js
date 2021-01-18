import { useConfirm } from "primevue/useConfirm";

export function showConfirm() {
  const confirm = useConfirm();
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      //callback to execute when user confirms the action
    },
    reject: () => {
      //callback to execute when user rejects the action
    }
  });
}
