<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import {
  Dropdown,
  ActionsDropdown,
  FormattableDateField,
} from '@autogestion/ui';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { formatToDisplay } from  '../../utils/dateUtils.js';
import {
  typeFieldData,
  filterOperatorsEnum,
  FilterOperator,
} from '@autogestion/general';
// import { axiosHelper } from '@autogestion/helpers';
import { SendData, FilterGroups, Filters } from './dataTableinterfaces';
import { Router } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Header {
  key: string;
  label: string;
  sortable?: boolean;
  typeField?: string;
  title?: string;
  url?: string;
  filterPlaceholder: string;
}

const props = defineProps({
  headers: {
    type: Array as () => Header[],
    required: true,
  },
  perPageOptions: {
    type: Array as () => { value: number; label: string }[],
    default: () => [
      { value: 5, label: '5' },
      { value: 10, label: '10' },
      { value: 20, label: '20' },
    ],
  },
  endpoint: {
    type: String,
    required: true,
  },
  router: {
    type: Object as () => Router,
    required: true,
  },
  itemsPerPage: {
    type: Number,
  },
  dateFormat: {
    type: String,
    default: 'd-m-Y',
  },
  filtrosPantalla: {
    type: Array as () => Filters[],
    default: [],
  },
  filtersEnabled: {
    type: Boolean,
    default: true,
  },
});

const isMobile = computed(() => windowWidth.value < 768);
const currentPage = ref(1);
const itemsPerPage = ref(props.itemsPerPage || props.perPageOptions[0].value);
const sortField = ref<string | null>(null);
const sortOrder = ref<number | null>(1);
const data = ref<any[]>([]);
const totalRecords = ref(0);
const showFilters = ref(false);
const windowWidth = ref(window.innerWidth);
const isLoading = ref(false);
const filterGroupPantalla = ref<FilterGroups>();
const hiddenColumns = ref<string[]>([]);
const pinnedColumns = ref<string[]>([]);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    // Se usa una nueva variable para no activar el watch.
    let sortFieldTemp = sortField.value;
    if (sortFieldTemp == null) {
      sortFieldTemp = props.headers[0].key;
    }

    // Se debe poner en mayuscula la primera letra porque en backend se requiere.
    sortFieldTemp =
      sortFieldTemp.charAt(0).toUpperCase() + sortFieldTemp.slice(1);

    const sendData: SendData = {
      first: itemsPerPage.value * currentPage.value - itemsPerPage.value,
      page: currentPage.value,
      pageSize: itemsPerPage.value,
      sortField: sortFieldTemp,
      sortOrder: sortOrder.value,
      filterGroups: buildFilterGroups(),
    };
    // await axiosHelper
    //   .post({ url: props.endpoint, data: sendData }, props.router)
    //   .then((response) => {
    //     data.value = response.records;
    //     totalRecords.value = response.totalRecords;
    //   });

    await new Promise((resolve) => setTimeout(resolve, 500)); // Simula retardo de red

    const total = 42;
    const start = sendData.first;
    const end = Math.min(start + sendData.pageSize, total);

    const dummyRecords = [];
    for (let i = start; i < end; i++) {
      const row: any = {};
      props.headers.forEach((header) => {
        if (Number(header.typeField) === typeFieldData.date) {
          row[header.key] = new Date(2024, 0, (i % 28) + 1).toISOString();
        } else if (Number(header.typeField) === typeFieldData.number) {
          row[header.key] = i + 1;
        } else {
          row[header.key] = `${header.label} ${i + 1}`;
        }
      });
      dummyRecords.push(row);
    }

    data.value = dummyRecords;
    totalRecords.value = total;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

watch([currentPage, itemsPerPage, sortField, sortOrder], fetchData, {
  deep: true,
});

const totalPages = computed(() =>
  Math.ceil(totalRecords.value / itemsPerPage.value)
);
const pageOptions = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }))
);

const handleSort = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value == 1 ? 2 : 1;
  } else {
    sortField.value = field;
    sortOrder.value = 1;
  }
};

const updatePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const updateItemsPerPage = (value: number) => {
  itemsPerPage.value = value;
  currentPage.value = 1;
};

const filters = ref<Record<string, string>>({});
const filterOperators = ref<Record<string, FilterOperator>>({});

const createOperatorActions = (
  fieldKey: string,
  type: 'text' | 'number' | 'date'
) => {
  return [
    ...(type === 'number'
      ? [
          {
            label: t('misc.operatorsLabels.contains'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.contains),
          },
          {
            label: t('misc.operatorsLabels.equals'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.equals),
          },
          {
            label: t('misc.operatorsLabels.greaterThan'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.greaterThan),
          },
          {
            label: t('misc.operatorsLabels.greaterThanOrEqual'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.greaterThanOrEqual),
          },
          {
            label: t('misc.operatorsLabels.lessThan'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.lessThan),
          },
          {
            label: t('misc.operatorsLabels.lessThanOrEqual'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.lessThanOrEqual),
          },
          {
            label: t('misc.operatorsLabels.notEquals'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.notEquals),
          },
        ]
      : type === 'date'
      ? [
          {
            label: t('misc.operatorsLabels.equals'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.equals),
          },
          {
            label: t('misc.operatorsLabels.notEquals'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.notEquals),
          },
          {
            label: t('misc.operatorsLabels.greaterThan'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.greaterThan),
          },
          {
            label: t('misc.operatorsLabels.greaterThanOrEqual'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.greaterThanOrEqual),
          },
          {
            label: t('misc.operatorsLabels.lessThan'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.lessThan),
          },
          {
            label: t('misc.operatorsLabels.lessThanOrEqual'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.lessThanOrEqual),
          },
        ]
      : [
          {
            label: t('misc.operatorsLabels.contains'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.contains),
          },
          {
            label: t('misc.operatorsLabels.equals'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.equals),
          },
          {
            label: t('misc.operatorsLabels.notEquals'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.notEquals),
          },
          {
            label: t('misc.operatorsLabels.startsWith'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.startsWith),
          },
          {
            label: t('misc.operatorsLabels.endsWith'),
            clickHandler: () =>
              setOperator(fieldKey, filterOperatorsEnum.endsWith),
          },
        ]),
  ];
};

const setOperator = (fieldKey: string, operator: FilterOperator) => {
  filterOperators.value[fieldKey] = operator;

  // Aplicar el operador lógico correcto
  if (!filters.value[fieldKey]) {
    filters.value[fieldKey] = ''; // Si no hay valor, lo inicializamos
  }

  applyFilters();
};

const operatorIcons = {
  [filterOperatorsEnum.equals]: 'fas fa-equals',
  [filterOperatorsEnum.notEquals]: 'fas fa-not-equal',
  [filterOperatorsEnum.greaterThan]: 'fas fa-greater-than',
  [filterOperatorsEnum.greaterThanOrEqual]: 'fas fa-greater-than-equal',
  [filterOperatorsEnum.lessThan]: 'fas fa-less-than',
  [filterOperatorsEnum.lessThanOrEqual]: 'fas fa-less-than-equal',
  [filterOperatorsEnum.contains]: 'fas fa-search',
  [filterOperatorsEnum.doesNotContains]: 'fas fa-search',
  [filterOperatorsEnum.startsWith]: 'fas fa-hand-point-right',
  [filterOperatorsEnum.endsWith]: 'fas fa-hand-point-left',
};

const toggleColumnVisibility = (key: string) => {
  if (hiddenColumns.value.includes(key)) {
    hiddenColumns.value = hiddenColumns.value.filter((col) => col !== key);
  } else {
    hiddenColumns.value.push(key);
  }
};

// Restaurar todas las columnas ocultas
const restoreAllColumns = () => {
  hiddenColumns.value = [];
};

// Restaurar una columna específica
const restoreColumn = (key: string) => {
  hiddenColumns.value = hiddenColumns.value.filter((col) => col !== key);
};

watch(
  () => props.headers,
  (headers) => {
    headers.forEach((header) => {
      if (!filterOperators.value[header.key]) {
        filterOperators.value[header.key] =
          Number(header.typeField) === typeFieldData.number ||
          Number(header.typeField) === typeFieldData.date
            ? filterOperatorsEnum.equals // Por defecto "igual" para números
            : filterOperatorsEnum.contains; // Por defecto "contiene" para textos
      }
    });
  },
  { immediate: true }
);

watch(
  () => props.filtrosPantalla,
  (filtrosPantalla) => {
    if (
      filtrosPantalla != undefined &&
      filtrosPantalla != null &&
      filtrosPantalla.length > 0
    ) {
      filterGroupPantalla.value = {
        filters: filtrosPantalla.map((key) => ({
          field: key.field,
          value: key.value,
          filterType: key.filterType,
          logicalOperator: key.logicalOperator,
        })),
        logicalOperator: 1, // 1 -> AND 2-> OR
      };

      applyFilters();
    }
  },
  { immediate: true }
);

const applyFilters = () => {
  fetchData();
};

const handleFilterInput = (fieldKey: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.type === 'number') {
    filters.value[fieldKey] = target.value
      ? Number(target.value).toString()
      : '';
  } else {
    filters.value[fieldKey] = target.value;
  }
};

const buildFilterGroups = (): FilterGroups[] => {
  const filterGroups: FilterGroups[] = [];
  // Convertir cada filtro en un objeto Filters y agruparlos
  const filtersArray: Filters[] = Object.keys(filters.value)
    .filter((key) => filters.value[key].trim() !== '') // Excluir filtros vacíos
    .map((key) => ({
      // Se debe poner en mayuscula la primera letra porque en backend se requiere.
      field: key.charAt(0).toUpperCase() + key.slice(1),
      value: filters.value[key],
      filterType: filterOperators.value[key] ?? 1, // Asignar operador
      logicalOperator: 1, // 1 -> AND 2-> OR
    }));

  if (
    filterGroupPantalla.value != undefined &&
    filterGroupPantalla.value != null
  ) {
    filterGroups.push(filterGroupPantalla.value);
  }

  if (filtersArray.length > 0) {
    filterGroups.push({
      filters: filtersArray,
      logicalOperator: 1, // 1 -> AND 2-> OR
    });
  }

  return filterGroups;
};

const togglePinColumn = (key: string) => {
  if (pinnedColumns.value.includes(key)) {
    pinnedColumns.value = pinnedColumns.value.filter((col) => col !== key);
  } else {
    pinnedColumns.value.push(key);
  }
};

const pinnedHeaders = computed(() =>
  isMobile.value
    ? []
    : props.headers.filter((h) => pinnedColumns.value.includes(h.key))
);

const normalHeaders = computed(() =>
  isMobile.value
    ? props.headers
    : props.headers.filter((h) => !pinnedColumns.value.includes(h.key))
);

watch(filters, applyFilters, { deep: true });

onMounted(() => {
  window.addEventListener('resize', () => {
    updateWindowWidth();
  });
  fetchData();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
</script>

<template>
  <div>
    <div class="filter-toggle-container md:hidden my-4">
      <button @click="showFilters = !showFilters" class="btn w-full mb-4">
        <FontAwesomeIcon :icon="['fas', 'filter']" />
        {{ showFilters ? $t('mischideMobileFilters') : $t('misc.showFilters') }}
        <FontAwesomeIcon
          :icon="['fas', showFilters ? 'chevron-up' : 'chevron-down']"
        />
      </button>
      <div v-show="showFilters || windowWidth >= 768" class="filters-container">
        <div class="filters-grid">
          <div v-for="header in headers" :key="header.key" class="filter-item">
            <label class="filter-label">
              {{ header.label }}
            </label>
            <div class="filter-input-container">
              <template v-if="Number(header.typeField) === typeFieldData.date">
                <FormattableDateField
                  :id="'date-' + header.key"
                  v-model="filters[header.key]"
                  :date-pattern="props.dateFormat"
                  :placeholder="header.filterPlaceholder || 'Filtrar...'"
                  :name="'date-' + header.key"
                />
              </template>
              <template v-else>
                <input
                  v-model="filters[header.key]"
                  :type="
                    Number(header.typeField) === typeFieldData.number
                      ? 'number'
                      : 'text'
                  "
                  class="table-filter-input"
                  :placeholder="header.filterPlaceholder || 'Filtrar...'"
                  @input="handleFilterInput(header.key, $event)"
                  @change="applyFilters"
                />
              </template>

              <ActionsDropdown
                :actions="
                  createOperatorActions(
                    header.key,
                    Number(header.typeField) === typeFieldData.number
                      ? 'number'
                      : Number(header.typeField) === typeFieldData.date
                      ? 'date'
                      : 'text'
                  )
                "
              >
                <!--<FontAwesomeIcon :icon="['fas', 'filter']" />-->
                <FontAwesomeIcon
                  v-if="filterOperators[header.key]"
                  :icon="operatorIcons[filterOperators[header.key] as keyof typeof operatorIcons]"
                  class="filter-icon"
                />
              </ActionsDropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenedor para mostrar botones de restauración -->
    <div v-if="hiddenColumns.length" class="restore-columns-container">
      <span>{{ $t('misc.hiddenCols') }}</span>
      <button
        v-for="column in hiddenColumns"
        :key="column"
        @click="restoreColumn(column)"
        class="restore-column-btn"
      >
        {{ headers.find((h) => h.key === column)?.label }}
        <FontAwesomeIcon :icon="['fas', 'eye']" />
      </button>
      <button @click="restoreAllColumns" class="restore-all-btn">
        {{ $t('misc.restoreAll') }}
        <FontAwesomeIcon :icon="['fas', 'eye']" />
      </button>
    </div>
    <!-- Tabla -->
    <div class="table-container">
      <!-- Contenedor para columnas fijadas -->
      <div class="pinned-columns hidden md:block" v-if="pinnedHeaders.length">
        <table class="table">
          <thead>
            <tr>
              <th
                v-for="header in pinnedHeaders.filter(
                  (h) => !hiddenColumns.includes(h.key)
                )"
                :key="header.key"
                @click="header.sortable ? handleSort(header.key) : null"
                class="table-header"
                :class="{ sortable: header.sortable }"
              >
                {{ header.label }}
                <button
                  @click.stop="togglePinColumn(header.key)"
                  class="pin-column-btn"
                >
                  <FontAwesomeIcon :icon="['fas', 'thumbtack']" />
                </button>
                <span v-if="header.sortable">
                  <FontAwesomeIcon
                    v-if="sortField === header.key && sortOrder === 1"
                    :icon="['fas', 'arrow-up']"
                  />
                  <FontAwesomeIcon
                    v-if="sortField === header.key && sortOrder === 2"
                    :icon="['fas', 'arrow-down']"
                  />
                </span>
              </th>
            </tr>
            <!-- Filtros -->
            <tr v-if="props.filtersEnabled" class="filters-row">
              <td
                v-for="header in pinnedHeaders.filter(
                  (h) => !hiddenColumns.includes(h.key)
                )"
                :key="header.key"
              >
                <div
                  class="table-filters"
                  v-if="Number(header.typeField) != typeFieldData.button"
                >
                  <template
                    v-if="Number(header.typeField) == typeFieldData.date"
                  >
                    <FormattableDateField
                      :id="'date-' + header.key"
                      v-model="filters[header.key]"
                      :date-pattern="props.dateFormat"
                      :placeholder="header.filterPlaceholder || 'Filter...'"
                      :name="'date-' + header.key"
                    />
                  </template>
                  <template v-else>
                    <input
                      v-model="filters[header.key]"
                      :type="
                        Number(header.typeField) === typeFieldData.number
                          ? 'number'
                          : 'text'
                      "
                      class="table-filter-input"
                      :placeholder="header.filterPlaceholder || 'Filter...'"
                      @input="handleFilterInput(header.key, $event)"
                      @change="applyFilters"
                      :step="
                        Number(header.typeField) === typeFieldData.number
                          ? 'any'
                          : undefined
                      "
                      :min="
                        Number(header.typeField) === typeFieldData.number
                          ? '-999999999'
                          : undefined
                      "
                    />
                  </template>

                  <ActionsDropdown
                    :actions="
                      createOperatorActions(
                        header.key,
                        Number(header.typeField) === typeFieldData.number
                          ? 'number'
                          : Number(header.typeField) === typeFieldData.date
                          ? 'date'
                          : 'text'
                      )
                    "
                  >
                    <!--<FontAwesomeIcon :icon="['fas', 'filter']" />-->
                    <FontAwesomeIcon
                      v-if="filterOperators[header.key]"
                      :icon="operatorIcons[filterOperators[header.key]]"
                      class="filter-icon"
                    />
                  </ActionsDropdown>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in data" :key="rowIndex">
              <td v-for="header in pinnedHeaders" :key="header.key">
                {{ row[header.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="main-table">
        <table class="table">
          <thead>
            <tr>
              <th
                v-for="header in normalHeaders.filter(
                  (h) => !hiddenColumns.includes(h.key)
                )"
                :key="header.key"
                @click="header.sortable ? handleSort(header.key) : null"
                class="table-header"
                :class="{ sortable: header.sortable }"
              >
                {{ header.label }}
                <button
                  @click.stop="togglePinColumn(header.key)"
                  class="pin-column-btn"
                >
                  <FontAwesomeIcon :icon="['fas', 'thumbtack']" />
                </button>
                <button
                  @click.stop="toggleColumnVisibility(header.key)"
                  class="hide-column-btn"
                >
                  <FontAwesomeIcon :icon="['fas', 'eye-slash']" />
                </button>
                <span v-if="header.sortable">
                  <FontAwesomeIcon
                    v-if="sortField === header.key && sortOrder === 1"
                    :icon="['fas', 'arrow-up']"
                  />
                  <FontAwesomeIcon
                    v-if="sortField === header.key && sortOrder === 2"
                    :icon="['fas', 'arrow-down']"
                  />
                </span>
              </th>
            </tr>
            <!-- Filtros -->
            <tr v-if="props.filtersEnabled" class="filters-row">
              <td
                v-for="header in normalHeaders.filter(
                  (h) => !hiddenColumns.includes(h.key)
                )"
                :key="header.key"
              >
                <div
                  class="table-filters"
                  v-if="Number(header.typeField) != typeFieldData.button"
                >
                  <template
                    v-if="Number(header.typeField) == typeFieldData.date"
                  >
                    <FormattableDateField
                      :id="'date-' + header.key"
                      v-model="filters[header.key]"
                      :date-pattern="props.dateFormat"
                      :placeholder="header.filterPlaceholder || 'Filter...'"
                      :name="'date-' + header.key"
                    />
                  </template>
                  <template v-else>
                    <input
                      v-model="filters[header.key]"
                      :type="
                        Number(header.typeField) === typeFieldData.number
                          ? 'number'
                          : 'text'
                      "
                      class="table-filter-input"
                      :placeholder="header.filterPlaceholder || 'Filter...'"
                      @input="handleFilterInput(header.key, $event)"
                      @change="applyFilters"
                      :step="
                        Number(header.typeField) === typeFieldData.number
                          ? 'any'
                          : undefined
                      "
                      :min="
                        Number(header.typeField) === typeFieldData.number
                          ? '-999999999'
                          : undefined
                      "
                    />
                  </template>

                  <ActionsDropdown
                    :actions="
                      createOperatorActions(
                        header.key,
                        Number(header.typeField) === typeFieldData.number
                          ? 'number'
                          : Number(header.typeField) === typeFieldData.date
                          ? 'date'
                          : 'text'
                      )
                    "
                  >
                    <!--<FontAwesomeIcon :icon="['fas', 'filter']" />-->
                    <FontAwesomeIcon
                      v-if="filterOperators[header.key]"
                      :icon="operatorIcons[filterOperators[header.key]]"
                      class="filter-icon"
                    />
                  </ActionsDropdown>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="isLoading && data.length > 0"
              :class="`h-20 hover:bg-transparent`"
            >
              <td>{{ $t('misc.loading') }}</td>
            </tr>
            <tr
              v-if="isLoading && data.length <= 0"
              class="h-60 hover:bg-transparent"
            >
              <td>{{ $t('misc.loading') }}</td>
            </tr>
            <tr v-for="(row, rowIndex) in data" :key="rowIndex">
              <td
                v-for="header in normalHeaders.filter(
                  (h) => !hiddenColumns.includes(h.key)
                )"
                :key="header.key"
              >
                <div
                  v-if="
                    header.typeField == null ||
                    header.typeField == typeFieldData.number.toString()
                  "
                >
                  {{ row[header.key] }}
                </div>
                <div
                  v-else-if="
                    header.typeField != null &&
                    header.typeField == typeFieldData.date.toString()
                  "
                >
                  {{ formatToDisplay(row[header.key]) }}
                </div>
                <div
                  v-else-if="
                    header.typeField != null &&
                    header.typeField == typeFieldData.button.toString()
                  "
                >
                  <a
                    :href="header.url?.concat(row[header.key])"
                    class="btn--main btn--small inline-block"
                  >
                    {{ header.title }}</a
                  >
                </div>
              </td>
            </tr>
            <tr v-if="data.length === 2" class="h-20 hover:bg-transparent">
              <td v-for="header in headers.length"></td>
            </tr>
            <tr v-if="data.length === 1" class="h-40 hover:bg-transparent">
              <td v-for="header in headers.length"></td>
            </tr>
            <tr
              v-if="data.length === 0 && !isLoading"
              class="h-60 hover:bg-transparent"
            >
              <td>{{ $t('misc.noData') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Paginación -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        v-if="currentPage > 1"
        class="prev-pag pagination-btn btn--main btn--outline"
        @click="updatePage(currentPage - 1)"
      >
        <FontAwesomeIcon :icon="['fas', 'fa-arrow-left']" />
        <span class="desktop"> {{ $t('misc.prev') }} </span>
      </button>

      <!-- Dropdown para elegir página -->
      <div class="pages">
        <Dropdown
          class="page-dropdown"
          :options="pageOptions"
          :value="currentPage"
          label-key="label"
          value-key="value"
          @onOptionSelected="updatePage"
        />
        <span class="text-sm text-dark-2">/ {{ ' ' + totalPages }}</span>
      </div>

      <button
        v-if="currentPage < totalPages"
        class="next-pag pagination-btn btn--main btn--outline"
        @click="updatePage(currentPage + 1)"
      >
        <span class="desktop"> {{ $t('misc.next') }} </span>
        <FontAwesomeIcon :icon="['fas', 'fa-arrow-right']" />
      </button>
    </div>

    <!-- Dropdown para cantidad de elementos por página -->
    <div class="dropdown-container">
      <label for="itemsPerPage" class="dropdown-label">
        {{ $t('misc.itemsPerPage') }}
      </label>
      <Dropdown
        class="items-dropdown"
        :options="props.perPageOptions"
        :value="itemsPerPage"
        label-key="label"
        value-key="value"
        @onOptionSelected="updateItemsPerPage"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.table-container {
  @apply overflow-x-scroll;
}

.table-header {
  @apply cursor-pointer;
}

.table-filters {
  @apply flex justify-center items-center gap-1;
  td,
  th {
    @apply pl-0;
  }
}

.table-header span {
  @apply ml-2 inline-block;
}

.table-header span.active {
  @apply text-main;
}

.pagination {
  @apply grid items-center justify-center gap-4 my-4 grid-cols-[25%_40%_25%] [grid-template-areas:'prev_pags_next'];
  @media (min-width: 768px) {
    @apply grid-cols-[30%_14%_12%_14%_30%] [grid-template-areas:'._prev_pags_next_.'];
  }
}

.pages {
  @apply flex justify-center items-center [grid-area:pags] gap-2;
}

.page-dropdown {
  @apply text-center;
}

.pagination-btn {
  @apply flex justify-center items-center gap-1;
}

.next-pag {
  @apply [grid-area:next];
}
.prev-pag {
  @apply [grid-area:prev];
}

.pagination-btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.dropdown-container {
  @apply flex items-center justify-end gap-4 mt-4;
}

.dropdown-label {
  @apply text-gray-700 font-medium;
}

.items-dropdown {
  @apply w-28;
}

.desktop {
  @apply hidden;
  @media (min-width: 768px) {
    @apply flex;
  }
}

.filters-row {
  td,
  th {
    @apply pl-4;
  }
}

.filters-container {
  @apply card w-full lg:w-max min-w-full max-w-full overflow-auto p-4;
}

.filters-grid {
  @apply grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4;
}

.filter-item {
  @apply flex flex-col items-start gap-2;
  &::after {
    content: '';
    @apply w-full border-b border-light;
  }
}

.filters-label {
  @apply font-bold;
}

.filter-input-container {
  @apply flex gap-2 items-center w-full;
  .input--with-icon {
    @apply w-full;
  }
}

.filter-icon {
  @apply text-dark ml-2;
}

.restore-columns-container {
  @apply flex gap-2 items-center mb-2 flex-wrap;
}

.restore-column-btn,
.restore-all-btn {
  @apply border rounded-full px-3 py-1 cursor-pointer flex items-center gap-1 bg-white border-dark-4 text-dark-2 hover:bg-light;
}

.header-container {
  @apply flex justify-between items-center gap-2;
}

.table-container {
  @apply flex flex-row;
}

/* Sección de columnas fijadas */
.pinned-columns {
  @apply sticky left-0 z-10 bg-white shadow-md;
}

.pinned-columns .table {
  @apply h-full;
}

.pinned-columns th,
.pinned-columns td {
  @apply border-r border-gray-200 bg-white hover:bg-light;
}

/* Botón para fijar/desfijar columnas */
.pin-column-btn {
  @apply bg-transparent border-none text-gray-500 cursor-pointer;
}

.pin-column-btn:hover {
  @apply text-gray-800;
}

.main-table {
  @apply w-full;
}
.pin-column-btn,
.hide-column-btn {
  @apply p-1 aspect-square;
}
</style>
