/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function() {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('zh-cn', {
        headerCell: {
          aria: {
            defaultFilterLabel: '列过滤器',
            removeFilter: '移除过滤器',
            columnMenuButtonLabel: '列菜单'
          },
          priority: '优先级:',
          filterLabel: "列过滤器: "
        },
        aggregate: {
          label: '行'
        },
        groupPanel: {
          description: '拖曳表头到此处进行分组'
        },
        search: {
          placeholder: '查找',
          showingItems: '已显示行数：',
          selectedItems: '已选择行数：',
          totalItems: '总行数：',
          size: '每页显示行数：',
          first: '首页',
          next: '下一页',
          previous: '上一页',
          last: '末页'
        },
        menu: {
          text: '选择列：'
        },
        sort: {
          ascending: '升序',
          descending: '降序',
          none: '无序',
          remove: '取消排序'
        },
        column: {
          hide: '隐藏列'
        },
        aggregation: {
          count: '计数：',
          sum: '求和：',
          avg: '均值：',
          min: '最小值：',
          max: '最大值：'
        },
        pinning: {
          pinLeft: '左侧固定',
          pinRight: '右侧固定',
          unpin: '取消固定'
        },
        columnMenu: {
          close: '关闭'
        },
        gridMenu: {
          aria: {
            buttonLabel: '表格菜单'
          },
          columns: '列：',
          importerTitle: '导入文件',
          exporterAllAsCsv: '导出全部数据到CSV',
          exporterVisibleAsCsv: '导出可见数据到CSV',
          exporterSelectedAsCsv: '导出已选数据到CSV',
          exporterAllAsPdf: '导出全部数据到PDF',
          exporterVisibleAsPdf: '导出可见数据到PDF',
          exporterSelectedAsPdf: '导出已选数据到PDF',
          clearAllFilters: '清除所有过滤器'
        },
        importer: {
          noHeaders: '无法获取列名，确定文件包含表头？',
          noObjects: '无法获取数据，确定文件包含数据？',
          invalidCsv: '无法处理文件，确定是合法的CSV文件？',
          invalidJson: '无法处理文件，确定是合法的JSON文件？',
          jsonNotArray: '导入的文件不是JSON数组！'
        },
        pagination: {
          aria: {
            pageToFirst: '第一页',
            pageBack: '上一页',
            pageSelected: '当前页',
            pageForward: '下一页',
            pageToLast: '最后一页'
          },
          sizes: '行每页',
          totalItems: '行',
          through: '至',
          of: '共'
        },
        grouping: {
          group: '分组',
          ungroup: '取消分组',
          aggregate_count: '合计: 计数',
          aggregate_sum: '合计: 求和',
          aggregate_max: '合计: 最大',
          aggregate_min: '合计: 最小',
          aggregate_avg: '合计: 平均',
          aggregate_remove: '合计: 移除'
        }
      });
      return $delegate;
    }]);
  }]);
})();
