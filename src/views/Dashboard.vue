<template>
  <div class="main">
    <div class="name-and-add">
      <span class="name"
        ><span>B­onjour,</span> {{ $store.state.user.name }}</span
      >
      <button class="add-transation" @click="showModal = true">
        Ajouter une transaction
      </button>
    </div>
    <div class="infos">
      <div class="entrees">
        <span class="title">Total des entrées:</span>
        <span class="number">{{ received }}</span>
        <span class="currency">Fra­ncs CFA</span>
      </div>
      <div class="solde">
        <span class="title">Votre Solde:</span>
        <span class="number">{{ received - withdraw }}</span>
        <span class="currency">Fra­ncs CFA</span>
      </div>
      <div class="sortie">
        <span class="title">Total des sorties:</span>
        <span class="number">{{ withdraw }}</span>
        <span class="currency">Fra­ncs CFA</span>
      </div>
    </div>
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Libellé</th>
            <th>Montant</th>
            <th>Type</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div class="actions">
                <img src="@/assets/edit.svg" alt="" @click="openUpdateModal(transaction)"/>
                <img src="@/assets/delete.svg" alt="" @click="deleteTransaction(transaction.id, index)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <NewTransaction :showModal="showModal" :btnModal="btnModal" />
    <UpdateTransaction v-if="currentTransaction" :showModal="showUpdateModal" :btnModal="btnUpdateModal" :currentTransaction = "currentTransaction" />
  </div>
</template>

<script>
import NewTransaction from "@/components/NewTransaction.vue";
import UpdateTransaction from "@/components/UpdateTransaction.vue";
export default {
  beforeMount() {
    this.getAllTransactions();
  },
  components: { NewTransaction, UpdateTransaction },

  data() {
    return {
      showModal: false,
      showUpdateModal: false,
      currentTransaction: null,
      transactions: [],
      received: 0,
      withdraw: 0,
    };
  },
  methods: {
    btnModal() {
      this.showModal = !this.showModal;
    },
    btnUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal;
    },
    openUpdateModal(transaction) {
      this.currentTransaction = transaction;
      this.btnUpdateModal();
    },
    getAllTransactions() {
      const url = "http://127.0.0.1:8000/api/transactions";
      let requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        },
      };
      fetch(url, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          this.transactions = result;

          for (let i = 0; i < this.transactions.length; i++) {
              if (this.transactions[i].type === 'sortie')  this.withdraw =  this.withdraw + this.transactions[i].amount;
              else this.received =  this.received + this.transactions[i].amount;
          }

          console.log(this.transactions, result);
        });
    },
    deleteTransaction(id, index) {
      const url = "http://127.0.0.1:8000/api/transactions/" + id;
      let requestOptions = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        },
      };
      fetch(url, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.message) {
            alert(result.message);
            this.transactions.splice(index, 1);
          }
        });
    },
  },
};
</script>

<style scoped>
.main {
  min-height: 100vh;
  padding: 0 119px;
  padding-bottom: 5em;
}
.name-and-add {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 92px;
}
.name {
  color: #ce8f31;
  font-size: 64px;
  font-family: "Open sans";
  font-weight: 300;
}
.name span {
  font-weight: 600;
}
.add-transation {
  width: 309px;
  height: 68px;
  font-family: "Open Sans";
  font-weight: 600;
  border: none;
  outline: none;
  background-color: #ce8f31;
  color: white;
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
}
.infos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 84px;
  padding-right: 92px;
  font-family: "Open sans";
  margin-left: 92px;
}
.infos div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.infos .title {
  font-weight: 300;
}
.entrees .number {
  color: #0a7c07;
}
.solde .number {
  color: #ce8f31;
}
.sortie .number {
  color: #ab4545;
}
.infos .number {
  font-size: 64px;
  font-weight: 600;
}
.infos .currency {
  font-weight: 400;
}
.data-table {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 92px;
}

.data-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 2px;
  font-family: "Open Sans";
  font-size: 24px;
  font-weight: 400;
}
.data-table table .actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;
}
thead {
  background-color: #ce8f31;
  color: white;
}
tbody {
  background-color: #f0dbba;
}
td,
th {
  text-align: center;
  height: 50px;
  min-width: 86px;
}
</style>