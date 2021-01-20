<template>
  <BaseFormComponent>
    <div class="p-field p-text-left">
      <label for="title" :class="{'p-invalid': !!titleError}">Title</label>
      <InputText type="text" v-model="title" name="title" id="title"
                 :class="{'p-invalid': !!titleError}" class="p-text-bold"/>
      <small id="name-help" class="p-invalid">
        {{ titleError }}
      </small>
    </div>
    <div class="p-field p-text-left">
      <label for="release-date" :class="{'p-invalid': !!releaseDateError}">Release Date</label>
      <Calendar id="release-date" v-model="releaseDate" :inline="true"/>
      <small id="release-help" class="p-invalid">
        {{ releaseDateError }}
      </small>
    </div>
  </BaseFormComponent>
</template>

<script>
import FormEventsMixin from "../mixins/FormEventsMixin"
import BaseFormComponent from "./BaseFormComponent"
import * as yup from "yup"
import {useField, useForm} from "vee-validate"
import {onMounted, watch} from "vue"
import ResourcePageMixin from "../mixins/ResourcePageMixin"
import InputText from "primevue/inputtext"
import Calendar from 'primevue/calendar'
import FormDataMixin from "../mixins/FormDataMixin";

export default {
  name: "MovieFormComponent",
  components: {BaseFormComponent, InputText, Calendar},
  mixins: [FormEventsMixin, ResourcePageMixin, FormDataMixin],
  setup(props, {emit}) {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().required().min(5).label('Title'),
      releaseDate: yup.date().required().label('Release Date')
    });
    const {meta: formStatus, values, validate} = useForm({validationSchema: schema, initialValues: props.initialInfo})
    const {value: title, errorMessage: titleError} = useField('title')
    const {value: releaseDate, errorMessage: releaseDateError} = useField('releaseDate')

    if (props.initialInfo) {
      onMounted(validate)
    }

    watch(formStatus, (newVal) => {
      emit('form-valid-changed', newVal.valid)
    })

    watch(values, (newVal) => {
      emit('form-value-changed', newVal)
    })

    return {
      title,
      titleError,
      releaseDate,
      releaseDateError
    }
  },
}
</script>

<style scoped>

</style>
