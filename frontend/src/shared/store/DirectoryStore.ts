import {defineStore} from "pinia";
import {$API} from "@/shared/api";

type State = {
    roleList: any[],
    statusApartmentList: any[],
    materialConstructionList: any[],
    statusConstructionList: any[],
}

export const useDirectoryStore = defineStore('directoryStore', {
    state: (): State => ({
        roleList: [],
        statusApartmentList: [],
        materialConstructionList: [],
        statusConstructionList: [],
    }),
    actions: {
        async getRoleList() {
            return await $API.get('/meta/role')
        },
        async getStatusApartmentList() {
            return await $API.get('/meta/status-apartments')
        },
        async getMaterialConstructionList() {
            return await $API.get('/meta/material-construction')
        },
        async getStatusConstructionList() {
            return await $API.get('/meta/status-construction')
        },
        async getAllList() {
            await Promise.allSettled([
                this.getRoleList(),
                this.getStatusApartmentList(),
                this.getMaterialConstructionList(),
                this.getStatusConstructionList()
            ]).then((res => {
                if (res[0].status === 'fulfilled')
                    this.roleList = res[0].value.data
                if (res[1].status === 'fulfilled')
                    this.statusApartmentList = res[1].value.data
                if (res[2].status === 'fulfilled')
                    this.materialConstructionList = res[2].value.data
                if (res[3].status === 'fulfilled')
                    this.statusConstructionList = res[3].value.data
            }))
        }
    }
})