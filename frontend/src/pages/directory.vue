<template>
  <Tabs v-model:value="activeTab">
    <TabList>
      <Tab value="role">Роли</Tab>
      <Tab value="material">Материалы постройки</Tab>
      <Tab value="statusApartment">Статусы квартир</Tab>
      <Tab value="statusConstruction">Этапы строительства</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="role">
        <DataTable :value="roleList" tableStyle="min-width: 50rem">
          <Column field="id" header=""></Column>
          <Column field="title" header="Название"></Column>
        </DataTable>
      </TabPanel>
      <TabPanel value="material">
        <DataTable :value="materialConstructionList" tableStyle="min-width: 50rem">
          <Column field="id" header=""></Column>
          <Column field="title" header="Название"></Column>
        </DataTable>
      </TabPanel>
      <TabPanel value="statusApartment">
        <DataTable :value="statusApartmentList" tableStyle="min-width: 50rem">
          <Column field="id" header=""></Column>
          <Column field="title" header="Название"></Column>
        </DataTable>
      </TabPanel>
      <TabPanel value="statusConstruction">
        <DataTable :value="statusConstructionList" tableStyle="min-width: 50rem">
          <Column field="id" header=""></Column>
          <Column field="title" header="Название"></Column>
        </DataTable>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup lang='ts'>
import Tabs from 'primevue/tabs';
import TabList from "primevue/tablist";
import Tab from 'primevue/tab';
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {onMounted, ref} from "vue";
import {useDirectoryStore} from "@/shared/store/DirectoryStore.ts";
import {storeToRefs} from "pinia";

const directoryStore = useDirectoryStore()
const { roleList, statusApartmentList, statusConstructionList, materialConstructionList } = storeToRefs(directoryStore)
const activeTab = ref('role')

onMounted(async () => {
  await directoryStore.getAllList()
})
</script>

<style scoped lang='scss'>

</style>