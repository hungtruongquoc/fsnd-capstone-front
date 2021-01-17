<template>
  <form>
    <div class="p-fluid">
      <div class="p-field p-text-left">
        <label for="name" :class="{'p-invalid': !!nameError}">Name</label>
        <InputText type="text" v-model="name" name="name" id="name"
                   :class="{'p-invalid': !!nameError}" class="p-text-bold"/>
        <small id="name-help" class="p-invalid">
          {{ nameError }}
        </small>
      </div>
      <div class="p-field p-text-left">
        <label for="age" :class="{'p-invalid': !!ageError}">Age</label>
        <InputNumber type="text" v-model="age" name="age" id="age" class="p-text-bold"
                     :class="{'p-invalid': !!ageError}"/>
        <small id="age-help" class="p-invalid">
          {{ ageError }}
        </small>
      </div>
      <div class="p-field p-text-left">
        <span class="p-mb-2 p-mt-4 p-d-block">Gender</span>
        <div class="p-field-radiobutton">
          <RadioButton id="gender-female" name="gender" :value="2" v-model="gender"/>
          <label for="gender-female" class="p-text-capitalize p-text-bold">female</label>
        </div>
        <div class="p-field-radiobutton">
          <RadioButton id="gender-male" name="gender" :value="1" v-model="gender"/>
          <label for="gender-male" class="p-text-capitalize p-text-bold">male</label>
        </div>
        <div class="p-field-radiobutton">
          <RadioButton id="gender-unknown" name="gender" :value="3" v-model="gender"/>
          <label for="gender-unknown" class="p-text-capitalize p-text-bold">Unspecified</label>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {watch} from 'vue'
import {useField, useForm} from 'vee-validate';
import InputNumber from "primevue/components/inputnumber/InputNumber";
import InputText from "primevue/components/inputtext/InputText";
import RadioButton from 'primevue/radiobutton';
import * as yup from 'yup';

export default {
  name: "ArtistFormComponent",
  components: {InputNumber, InputText, RadioButton},
  setup(props, {emit}) {
    // Define a validation schema
    const schema = yup.object({
      name: yup.string().required().min(5).label('Artist name'),
      age: yup.number().positive('Age cannot be negative').required().min(5).max(100).label('Age'),
      gender: yup.number().required().min(1).max(3).label('Gender')
    });
    const {meta: formStatus, values} = useForm({validationSchema: schema})
    const {value: name, errorMessage: nameError} = useField('name')
    const {value: age, errorMessage: ageError} = useField('age')
    const {value: gender, errorMessage: genderError} = useField('gender')

    watch(formStatus, (newVal) => {
      emit('form-valid-changed', newVal.valid)
    })

    watch(values, (newVal) => {
      emit('form-value-changed', newVal)
    })

    return {
      name,
      nameError,
      age,
      ageError,
      gender,
      genderError,
      formStatus
    }
  },
  emits: {
    'form-valid-changed': null,
    'form-value-changed': null
  }
}
</script>

<style scoped>

</style>
