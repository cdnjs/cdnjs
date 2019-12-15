/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function() {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ja', {
        headerCell: {
          aria: {
            defaultFilterLabel: '列のフィルター',
            removeFilter: 'フィルターの解除',
            columnMenuButtonLabel: '列のメニュー'
          },
          priority: '優先度:',
          filterLabel: "列フィルター: "
        },
        aggregate: {
          label: '項目'
        },
        groupPanel: {
          description: 'ここに列ヘッダをドラッグアンドドロップして、その列でグループ化します。'
        },
        search: {
          placeholder: '検索...',
          showingItems: '表示中の項目:',
          selectedItems: '選択した項目:',
          totalItems: '項目の総数:',
          size: 'ページサイズ:',
          first: '最初のページ',
          next: '次のページ',
          previous: '前のページ',
          last: '前のページ'
        },
        menu: {
          text: '列の選択:'
        },
        sort: {
          ascending: '昇順に並べ替え',
          descending: '降順に並べ替え',
          none: '並べ替え無し',
          remove: '並べ替えの解除'
        },
        column: {
          hide: '列の非表示'
        },
        aggregation: {
          count: '行数: ',
          sum: '合計: ',
          avg: '平均: ',
          min: '最小: ',
          max: '最大: '
        },
        pinning: {
          pinLeft: '左に固定',
          pinRight: '右に固定',
          unpin: '固定解除'
        },
        columnMenu: {
          close: '閉じる'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'グリッドメニュー'
          },
          columns: '列の表示/非表示:',
          importerTitle: 'ファイルのインポート',
          exporterAllAsCsv: 'すべてのデータをCSV形式でエクスポート',
          exporterVisibleAsCsv: '表示中のデータをCSV形式でエクスポート',
          exporterSelectedAsCsv: '選択したデータをCSV形式でエクスポート',
          exporterAllAsPdf: 'すべてのデータをPDF形式でエクスポート',
          exporterVisibleAsPdf: '表示中のデータをPDF形式でエクスポート',
          exporterSelectedAsPdf: '選択したデータをPDF形式でエクスポート',
          clearAllFilters: 'すべてのフィルタをクリア'
        },
        importer: {
          noHeaders: '列名を取得できません。ファイルにヘッダが含まれていることを確認してください。',
          noObjects: 'オブジェクトを取得できません。ファイルにヘッダ以外のデータが含まれていることを確認してください。',
          invalidCsv: 'ファイルを処理できません。ファイルが有効なCSV形式であることを確認してください。',
          invalidJson: 'ファイルを処理できません。ファイルが有効なJSON形式であることを確認してください。',
          jsonNotArray: 'インポートしたJSONファイルには配列が含まれている必要があります。処理を中止します。'
        },
        pagination: {
          aria: {
            pageToFirst: '最初のページ',
            pageBack: '前のページ',
            pageSelected: '現在のページ',
            pageForward: '次のページ',
            pageToLast: '最後のページ'
          },
          sizes: '件/ページ',
          totalItems: '件',
          through: 'から',
          of: '件/全'
        },
        grouping: {
          group: 'グループ化',
          ungroup: 'グループ化の解除',
          aggregate_count: '集計表示: 行数',
          aggregate_sum: '集計表示: 合計',
          aggregate_max: '集計表示: 最大',
          aggregate_min: '集計表示: 最小',
          aggregate_avg: '集計表示: 平均',
          aggregate_remove: '集計表示: 解除'
        },
        validate: {
          error: 'Error:',
          minLength: 'THRESHOLD 文字以上で入力してください。',
          maxLength: 'THRESHOLD 文字以下で入力してください。',
          required: '値が必要です。'
        }
      });
      return $delegate;
    }]);
  }]);
})();
