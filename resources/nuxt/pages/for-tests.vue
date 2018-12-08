<template>
<div>
  <h2>Статистика продаж</h2>

  <div class="card">
    <header>
      <chartjs-line 
        v-bind:beginzero="beginZero"
        v-bind:labels="labels[radio]"
        v-bind:datalabel="dataLabel"
        v-bind:data="data[radio]"
        v-bind:backgroundcolor="bgColor"
        v-bind:bordercolor="borderColor"
        v-bind:bind="true"/>
    </header>

  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      beginZero: true,
      labels: {
        week: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
      },
      dataLabel: "Проданные товары",
      radio: "week",
      data: {
        week: [4, 2, 11, 1, 5, 3, 7]
      },
      bgColor: "#ff8a80",
      borderColor: "#f44336"
    };
  }
};
</script>