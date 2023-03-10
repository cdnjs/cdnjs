(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( [], factory);
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = factory();
	}
	// No browser loader - use JSON, ESM, CJS or AMD
}
(function() {
    return {
    "emptyTable": "Não foi encontrado nenhum registo",
    "loadingRecords": "A carregar...",
    "processing": "A processar...",
    "lengthMenu": "Mostrar _MENU_ registos",
    "zeroRecords": "Não foram encontrados resultados",
    "search": "Procurar:",
    "paginate": {
        "first": "Primeiro",
        "previous": "Anterior",
        "next": "Seguinte",
        "last": "Último"
    },
    "aria": {
        "sortAscending": ": Ordenar colunas de forma ascendente",
        "sortDescending": ": Ordenar colunas de forma descendente"
    },
    "autoFill": {
        "cancel": "cancelar",
        "fill": "preencher",
        "fillHorizontal": "preencher células na horizontal",
        "fillVertical": "preencher células na vertical"
    },
    "buttons": {
        "collection": "Coleção",
        "colvis": "Visibilidade de colunas",
        "colvisRestore": "Restaurar visibilidade",
        "copy": "Copiar",
        "copySuccess": {
            "1": "Uma linha copiada para a área de transferência",
            "_": "%ds linhas copiadas para a área de transferência"
        },
        "copyTitle": "Copiar para a área de transferência",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Mostrar todas as linhas",
            "_": "Mostrar %d linhas"
        },
        "pdf": "PDF",
        "print": "Imprimir",
        "copyKeys": "Pressionar CTRL ou u2318 + C para copiar a informação para a área de transferência. Para cancelar, clique nesta mensagem ou pressione ESC.",
        "createState": "Criar",
        "removeAllStates": "Remover Todos",
        "removeState": "Remover",
        "renameState": "Renomear",
        "savedStates": "Gravados",
        "stateRestore": "Estado %d",
        "updateState": "Atualizar"
    },
    "decimal": ",",
    "infoFiltered": "(filtrado num total de _MAX_ registos)",
    "infoThousands": ".",
    "searchBuilder": {
        "add": "Adicionar condição",
        "button": {
            "0": "Construtor de pesquisa",
            "_": "Construtor de pesquisa (%d)"
        },
        "clearAll": "Limpar tudo",
        "condition": "Condição",
        "conditions": {
            "date": {
                "after": "Depois",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vazio",
                "equals": "Igual",
                "not": "Diferente",
                "notBetween": "Não está entre",
                "notEmpty": "Não está vazio"
            },
            "number": {
                "between": "Entre",
                "empty": "Vazio",
                "equals": "Igual",
                "gt": "Maior que",
                "gte": "Maior ou igual a",
                "lt": "Menor que",
                "lte": "Menor ou igual a",
                "not": "Diferente",
                "notBetween": "Não está entre",
                "notEmpty": "Não está vazio"
            },
            "string": {
                "contains": "Contém",
                "empty": "Vazio",
                "endsWith": "Termina em",
                "equals": "Igual",
                "not": "Diferente",
                "notEmpty": "Não está vazio",
                "startsWith": "Começa em",
                "notContains": "Não contém",
                "notStartsWith": "Não começa com",
                "notEndsWith": "Não termina com"
            },
            "array": {
                "equals": "Igual",
                "empty": "Vazio",
                "contains": "Contém",
                "not": "Diferente",
                "notEmpty": "Não está vazio",
                "without": "Sem"
            }
        },
        "data": "Dados",
        "deleteTitle": "Excluir condição de filtragem",
        "logicAnd": "E",
        "logicOr": "Ou",
        "title": {
            "0": "Construtor de pesquisa",
            "_": "Construtor de pesquisa (%d)"
        },
        "value": "Valor",
        "leftTitle": "Excluir critério",
        "rightTitle": "Incluir critério"
    },
    "searchPanes": {
        "clearMessage": "Limpar tudo",
        "collapse": {
            "0": "Painéis de pesquisa",
            "_": "Painéis de pesquisa (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sem painéis de pesquisa",
        "loadMessage": "A carregar painéis de pesquisa",
        "title": "Filtros ativos",
        "showMessage": "Mostrar todos",
        "collapseMessage": "Ocultar Todos"
    },
    "select": {
        "cells": {
            "1": "1 célula seleccionada",
            "_": "%d células seleccionadas"
        },
        "columns": {
            "1": "1 coluna seleccionada",
            "_": "%d colunas seleccionadas"
        },
        "rows": {
            "1": "%d linha seleccionada",
            "_": "%d linhas seleccionadas"
        }
    },
    "thousands": ".",
    "editor": {
        "close": "Fechar",
        "create": {
            "button": "Novo",
            "title": "Criar novo registro",
            "submit": "Criar"
        },
        "edit": {
            "button": "Editar",
            "title": "Editar registro",
            "submit": "Atualizar"
        },
        "remove": {
            "button": "Remover",
            "title": "Remover",
            "submit": "Remover",
            "confirm": {
                "_": "Tem certeza que quer apagar %d entradas?",
                "1": "Tem certeza que quer apagar esta entrada?"
            }
        },
        "multi": {
            "title": "Multiplos valores",
            "restore": "Desfazer alterações",
            "info": "Os itens selecionados contêm valores diferentes para esta entrada. Para editar e definir todos os itens nesta entrada com o mesmo valor, clique ou toque aqui, caso contrário, eles manterão os seus valores individuais.",
            "noMulti": "Este campo pode ser editado individualmente mas não pode ser editado em grupo"
        },
        "error": {
            "system": "Ocorreu um erro no sistema"
        }
    },
    "info": "Mostrando os registos _START_ a _END_ num total de _TOTAL_",
    "infoEmpty": "Mostrando 0 os registos num total de 0",
    "datetime": {
        "previous": "anterior",
        "next": "próximo",
        "hours": "horas",
        "minutes": "minutos",
        "seconds": "segundos",
        "unknown": "desconhecido",
        "amPm": [
            "am",
            "pm"
        ],
        "weekdays": [
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb",
            "Dom"
        ],
        "months": [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ]
    },
    "stateRestore": {
        "creationModal": {
            "button": "Criar",
            "columns": {
                "search": "Pesquisa por Colunas",
                "visible": "Visibilidade das Colunas"
            },
            "name": "Nome:",
            "order": "Ordenar",
            "paging": "Paginação",
            "scroller": "Posição da barra de Scroll",
            "search": "Pesquisa",
            "searchBuilder": "Pesquisa Avançada",
            "select": "Selecionar",
            "title": "Criar Novo Estado",
            "toggleLabel": "Incluir:"
        },
        "duplicateError": "Já existe um estado com o mesmo nome",
        "emptyError": "NÀ�o pode estar a vazio",
        "emptyStates": "Não existem estados gravados",
        "removeConfirm": "Deseja mesmo remover o estado %s?",
        "removeError": "Erro ao remover o estado.",
        "removeJoiner": " e ",
        "removeSubmit": "Apagar",
        "removeTitle": "Apagar Estado",
        "renameButton": "Renomear",
        "renameLabel": "Novo nome para %s:",
        "renameTitle": "Renomear Estado"
    }
};
}));
