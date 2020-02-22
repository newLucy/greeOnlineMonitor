<template>
	<div class="tableWrap">
		<table>
			<tr>
				<th v-for="item in tableArray.tableHeader" :key="item.key" :style="{width: item.width}">{{item.label}}</th>
			</tr>
			<tr v-for="(item, index) in tableArray.tableData" :key="item.index">
				<td v-for="subItem in tableArray.tableHeader" :key="subItem.key">{{item[subItem.key]}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
  name: 'search-table',
  props: ['tableArray']
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
  .tableWrap {
  	width: 100%;
  	overflow: auto;
  	table {
  		border-collapse: collapse;
  		tr {
  			th {
  				border: 1px solid white;
  				border-width: 1px 2px;
  				padding: 16px 10px;
    			background-color: #e4e4e4;
    			font-weight: bold;
  			}
  			td {
  				border: 1px solid white;
  				border-width: 1px 2px;
  				padding: 12px 0;
  				text-align: center;
    			background: #ddebff;
  			}
  		}
  	}
  }
</style>
