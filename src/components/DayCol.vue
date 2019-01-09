<template>
  <v-flex id="day-col">
    <v-layout column justify-space-between fill-height>
      <v-flex 
        v-for="(slot, index) in dayCol" 
        v-bind:class="`time ${slot.color}${index % 2 === 0 ? '-odd' : ''}`" 
        v-bind:key="index"
        pt-1
      >
        <span ma-0 pa-0>{{slot.displayName ? slot.displayName : ''}}</span>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  props: ['dayCol'],
  data: () => ({
  }),
  methods: {
    colorClass (index) {
      if (this.slots[index]) {
        return 'red';
      } else {
        return (index + 1) % 2 === 0 ? 'even' : 'odd';
      }
    }
  },
}
</script>

<style>
.time {
  text-align: center;
  font-size: 1.2rem;
  flex-basis: 2.5rem;
  white-space: nowrap;

}
.color1{
  background-color: #008F7D;
}
.color2{
  background-color: #e6194B;
}
.color3{
  background-color: #ffe119;
}
.color4{
  background-color: #4363d8;
}
.color5{
  background-color: #f58231;
}
.color6{
  background-color: #42d4f4;
}
.color7{
  background-color: #f032e6;
}
.color8{
  background-color: #fabebe;
}
.color9{
  background-color: #469990;
}
.color10{
  background-color: #9A6324;
}
.color11{
  background-color: #800000;
}
.color12{
  background-color: #aaffc3;
}
.color13{
  background-color: #e6194B;
}
.color14{
  background-color: #bfef45;
}
.color15{
  background-color: #911eb4;
}
.color16{
  background-color: #ffd8b1;
}
.color17{
  background-color: #808000;
}
.color1-odd{
  background-color: rgb(19, 158, 140);
}
.color2-odd{
  background-color: #FF3365;
}
.color3-odd{
  background-color: #FFFB33;
}
.color4-odd{
  background-color: #5D7DF2;
}
.color5-odd{
  background-color: #FF9C4B;
}
.color6-odd{
  background-color: #5CEEFF;
}
.color7-odd{
  background-color: #FF4CFF;
}
.color8-odd{
  background-color: #FFD8D8;
}
.color9-odd{
  background-color: #60B3AA;
}
.color10-odd{
  background-color: #B47D3E;
}
.color11-odd{
  background-color: #9A1A1A;
}
.color12-odd{
  background-color: #C4FFDD;
}
.color13-odd{
  background-color: #FF3365;
}
.color14-odd{
  background-color: #D9FF5F;
}
.color15-odd{
  background-color: #AB38CE;
}
.color16-odd{
  background-color: #FFF2CB;
}
.color17-odd{
  background-color: #9A9A1A;
}
.nullColor {
  /* background-color: rgba(179, 174, 174, 0.712); */
  background-color: rgba(143, 140, 140, 0.842);

}
.nullColor-odd {
  background-color: rgba(179, 174, 174, 0.712);
}
/* .placeholder {
  visibility: hidden;
} */
</style>
