<!-- Template -->
<template>
  <Dialog
    @close="$emit('close')"
    :isVisible="props.showForm"
    :title="dialogTitle"
    :headerIcon="dialogIcon"
  >
    <template v-slot:body>
      <div class="form-container container">
        <div class="row">
          <div class="col-6">
            <div>
              <label for="title" class="form-label">Title</label>
              <div class="input-group has-validation has-validaiton-message">
                <input
                  v-model="title"
                  v-bind:class="{'is-invalid': validationErrors?.title}"
                  class="form-control"
                  id="title"
                />
                <div class="invalid-feedback">Please provide a title.</div>
              </div>
            </div>
          </div>

          <div class="col-6">
            <div>
              <label for="category" class="form-label">Category</label>
              <div class="input-group">
                <Select
                  :options="categoryOptions"
                  v-model="categoryId"
                  :inputClass="validationErrors?.categoryId ? 'is-invalid' : ''"
                  validationMessage="Please choose a category."
                />
              </div>
            </div>
          </div>

          <div class="col-6">
            <div>
              <label for="date" class="form-label">Date</label>
              <div class="input-group transaction-date-picker-container">
                <Datepicker class="transaction-date-picker form-control" v-model="date" :inputFormat="dayFormat" />
              </div>
            </div>
          </div>

          <div class="col-6">
            <div>
              <label for="amountInput" class="form-label">Amount</label>
              <div class="input-group has-validation has-validaiton-message">
                <span class="input-group-text">{{amountSign}}</span>
                <input
                  v-model="amount"
                  v-bind:class="{'is-invalid': validationErrors?.amount}"
                  class="form-control"
                  id="amountInput"
                  v-bind="{ type: 'number', min: '0', max: '100', step: '0.01'}"
                />
                <span class="input-group-text">$</span>
                <div class="invalid-feedback">Please provide a positive number.</div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="notes" class="form-label">Notes</label>
              <textarea v-model="notes" class="form-control" id="notes" rows="3"></textarea>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <div class="form-buttons-container">
        <IconButton
          v-on:click="$emit('close')"
          class="form-button"
          text="Close"
          iconName="close"
          buttonType="outline-light"
          buttonSize="large"
        />

        <IconButton
          v-on:click="handleSave"
          class="form-button"
          text="Save"
          iconName="save"
          buttonType="outline-primary"
          buttonSize="large"
        />
      </div>
    </template>
  </Dialog>
</template>

<!-- Script -->
<script lang="ts">
import { Transaction } from '@/db/models/transaction';
import { computed, defineComponent, ref, watch } from 'vue';
import Dialog from '@/components/misc/Dialog.vue';
import IconButton from '@/components/misc/IconButton.vue';
import Select from '@/components/misc/Select/Select.vue';
import { TransactionType } from '@/common/enums/TransactionType';
import useCategoriesAsOptions from '@/composables/categories/useCategoriesAsOptions';
import Datepicker from 'vue3-datepicker';
import { dateFormats } from '@/common/constants/dateFormats';

export default defineComponent({
  name: 'TransactionsForm',
  components: {
    Dialog,
    IconButton,
    Select,
    Datepicker
  },
  emits: ['close', 'save'],
  props: {
    showForm: Boolean,
    model: Object as () => Transaction | null,
    transactionType: String as () => TransactionType
  },
  setup(props, { emit }) {
    const { categoryOptions } = useCategoriesAsOptions();
    const categoryId = ref('');
    const date = ref<Date>(new Date());
    const title = ref('');
    const amount = ref(0);
    const notes = ref('');
    const typeOfTransaction = ref(props.transactionType as TransactionType);
    const validationErrors = ref<any>({});

    const initFields = () => {
      const model = props.model;
      date.value = model?.date ? new Date(model.date) : new Date();
      title.value = model?.title || '';
      amount.value = Math.abs(model?.amount || 0);
      notes.value = model?.notes || '';
      categoryId.value = model?.categoryId || '';
    }

    watch(
      () => props.transactionType,
      (newVal: string | undefined) => {
        typeOfTransaction.value = newVal as TransactionType;
      }
    );

    watch(
      () => props.showForm,
      () => {
        validationErrors.value = {};
        if (props.showForm) {
          initFields();
        }
      }
    );

    watch(
      () => props.model?._id,
      () => {
        initFields();
      },
      {
        deep: true
      }
    );

    const dialogTitle = computed(() =>
      typeOfTransaction.value === TransactionType.Income
        ? props.model ? 'Edit income' : 'New income'
        : props.model ? 'Edit expense' : 'New expense'
    );
    const amountSign = computed(() =>
      typeOfTransaction.value === TransactionType.Income ? '+' : '-'
    );
    const dialogIcon = computed(() => (props.model ? 'edit' : 'plus-circle'));

    const validateFormData = () => {
      if (!(title.value || '').trim()) {
        validationErrors.value.title = true;
      } else {
        validationErrors.value.title = false;
      }

      if (!(categoryId.value || '').trim()) {
        validationErrors.value.categoryId = true;
      } else {
        validationErrors.value.categoryId = false;
      }

      if (!date.value) {
        validationErrors.value.date = true;
      } else {
        validationErrors.value.date = false;
      }

      const amountAsNumber = Number(amount.value);
      if (!amountAsNumber || amountAsNumber <= 0) {
        validationErrors.value.amount = true;
      } else {
        validationErrors.value.amount = false;
      }
    };

    const handleSave = () => {
      validateFormData();
      const hasValidationErrors = Object.values(validationErrors.value).some(
        (x) => x
      );

      if (hasValidationErrors) {
        return;
      }

      const transaction = {
        ...props.model,
        title: title.value,
        notes: notes.value,
        amount:
          typeOfTransaction.value === TransactionType.Income
            ? Number(amount.value)
            : -Number(amount.value),
        categoryId: categoryId.value,
        date: date.value.getTime()
      };

      emit('save', transaction);
    };

    return {
      props,
      dialogTitle,
      dialogIcon,
      handleSave,
      amountSign,
      categoryOptions,
      categoryId,
      date,
      notes,
      amount,
      title,
      validationErrors,
      dayFormat: dateFormats.dayFormat
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../../common/styles/_variables.scss";
@import "../../../common/styles/forms.scss";

.form-label {
  margin-bottom: 0.1rem;
}

:deep(.transaction-date-picker) {
  width: 100%;
  &[readonly] {
    background-color: $white !important;
  }
}

.transaction-date-picker-container {
  &>div {
    width: 100% !important;
  }
}

.has-validaiton-message {
  height: 59px;
  .form-control,
  .input-group-text  {
    height: 36px;
  }
}
</style>
