<template>
  <!-- TODO separate the seach bar into another component, and put it in the taskDashboard -->
  <div class="rootDiv">
    <div class="searchBar">
      <div class="input-group mb-5">
        <input
          type="search"
          class="form-control"
          v-model="searchQuery"
          placeholder="Task's Name"
        />
      </div>
    </div>

    <table
      id="tableComponent"
      class="table table-bordered table-striped table-hover table-responsive"
    >
      <thead>
        <th
          v-for="header in headers"
          :key="header.nameToDisplay"
          @click="sortTable(header.jsonId)"
        >
          <div>
            {{ header.nameToDisplay }}
            <font-awesome-icon icon="sort" />
          </div>
        </th>
      </thead>
      <tbody>
        <tr v-for="item in filteredList" :key="item" @click="goToTaskInformation(item.uid)">
          <td v-for="header in headers" :key="header.nameToDisplay">
            {{ item[header.jsonId] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { sortBy,reverse } from "lodash";
import { ref, computed, onMounted } from "vue";
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
  setup() {
    //TODO See how to refactor the headers variable
    const headers = [
      {
        nameToDisplay: "Task Title",
        jsonId: "title",
      },
      {
        nameToDisplay: "Priority",
        jsonId: "priority",
      },
      {
        nameToDisplay: "Date",
        jsonId: "dateToDisplay",
      },
      {
        nameToDisplay: "Last Modified Date",
        jsonId: "lastModifiedDateToDisplay",
      },
      {
        nameToDisplay: "Status",
        jsonId: "status",
      },
    ];


    const store = useStore()
    let router = useRouter()

    let sort = ref(false);
    let updatedList = ref([]);
    let searchQuery = ref("");

    //if the task data changes, recompute it
    const data = computed(()=>{
      return store.getters['dashboard/currentTaskData']
    })

    //obtain all the task data from the backend when mounting the component
    onMounted(()=> {
      store.dispatch('dashboard/getTasksData')
    })


    //TODO Sort by default ascending, if clicked then descending
    //function to sort the table
    const sortTable = (column) => {
      sort.value = true;

      //check to see if the column to sort is one of the two that involve dates, if so, sort them by timestamp instead of a readable date
      if(column == 'dateToDisplay'){
        updatedList.value = sortBy(data.value, 'dateTimeStamp');
      }
      else if(column == 'lastModifiedDateToDisplay'){
        updatedList.value = sortBy(data.value, 'lastModifiedDateTimeStamp');
      }

      else  {
        updatedList.value = sortBy(data.value, column);
      } 
    };

    //TODO Move sortedList and filteredList functionality to dashboard.store, maybe as getters?
    //checks if a column has been sorted
    const sortedList = computed(() => {
      if (sort.value) {
        return reverse(updatedList.value);
      } else {
        return data.value;
      }
    });

    //filter search
    const filteredList = computed(() => {
      if(sortedList.value == null){
        return data.value
      }
      return sortedList.value.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });

    //move to the task route to display its information
    const goToTaskInformation = (taskId) => {
      // console.log(sortedList)
      // console.log(taskId)
      router.push(`/task/${taskId}`)
    }

    return {
      headers,
      data,
      searchQuery,
      sortedList,
      sortTable,
      filteredList,
      goToTaskInformation
    };
  },
};
</script>

<style scoped>
table th:hover {
  background: #f2f2f2;
}

table th {
  text-align: center;
  vertical-align: middle;
}
</style>