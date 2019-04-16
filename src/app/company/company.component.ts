import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableService } from 'projects/subway-framework/src/lib/data-table/data-table.service';
import { DialogService } from 'projects/subway-framework/src/lib/components/dialog/dialog.service';
import { CompanyViewEditComponent } from './company-view-edit/company-view-edit.component';
import { CompanyService } from './company.service';
import { ToastrService } from 'projects/subway-framework/src/lib/toastr/toastr.service';
import {
  ColumnNameTypes,
  DataTableColumnNamesInterface
} from 'projects/subway-framework/src/lib/data-table/data-table.component';

const ELEMENT_DATA = [
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    status: 1,
    active: true,
    timeZone: 'E. South America Standard Time',
    teste: 'no',
    id: 1
  },
  {
    grupo: 'grupo2',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    status: 2,
    active: false,
    timeZone: 'E. South America Standard Time',
    teste: 'nao',
    id: 1
  },
  {
    grupo: 'grupo3',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    status: 3,
    active: true,
    timeZone: 'E. South America Standard Time',
    teste: 'yes',
    id: 1
  },
  {
    grupo: 'grupo4',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    status: 4,
    active: false,
    timeZone: 'E. South America Standard Time',
    teste: 'sim',
    id: 1
  }
];

const namesColumn = [
  { columnNameApi: 'id', displayName: 'Id', type: ColumnNameTypes.actions },
  {
    columnNameApi: 'grupo',
    displayName: 'Grupo',
    type: ColumnNameTypes.default
  },
  {
    columnNameApi: 'cnpj',
    displayName: 'CNPJ',
    type: ColumnNameTypes.cpf_cnpj
  },
  {
    columnNameApi: 'razaoSocial',
    displayName: 'Razão Social',
    type: ColumnNameTypes.actions
  },
  {
    columnNameApi: 'dataCadastro',
    displayName: 'Data Cadastro',
    type: ColumnNameTypes.date
  },
  {
    columnNameApi: 'emailResponsavel',
    displayName: 'E-Mail Responsável',
    type: ColumnNameTypes.actions
  },
  {
    columnNameApi: 'status',
    displayName: 'Status',
    type: ColumnNameTypes.status,
    enumDisplayName: { 1: 'Status 1', 2: 'Status 2', 3: 'Status 3', 4: 'Status 4' }
  },
  {
    columnNameApi: 'active',
    displayName: 'Ativo',
    type: ColumnNameTypes.true_false,
    enumDisplayName: { true: 'Sim', false: 'Não' }
  },
  {
    columnNameApi: 'teste',
    displayName: 'Teste Column',
    type: ColumnNameTypes.yes_no,
    enumDisplayName: { sim: 'sim', nao: 'não', no: 'não no', yes: 'sim yes' }
  },
  {
    columnNameApi: 'timeZone',
    displayName: 'Fuso Horário',
    type: ColumnNameTypes.actions
  }
];

const ACTIONS = [
  {
    actionName: 'Visualizar',
    actionDescription: 'Visualizar Registro',
    actionIcon: 'search',
    actionFunction: 'Click Function'
  },
  {
    actionName: 'Editar',
    actionDescription: 'Editar Registro',
    actionIcon: 'edit',
    actionFunction: 'Click Function'
  },
  {
    actionName: 'Excluir',
    actionDescription: 'Excluir Registro',
    actionIcon: 'delete',
    actionFunction: 'Click Function',
    isDelete: true,
    isDeleteTitle: 'Deletar Item',
    isDeleteDescription: 'Tem certeza que deseja excluir o item?'
  },
  {
    actionName: 'Download',
    actionDescription: 'Download Registro',
    actionIcon: 'cloud_download',
    actionFunction: 'Click Function'
  }
];

const TOPACTIONSBUTTON = [];

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {
  columnNames = namesColumn;
  actions = ACTIONS;
  // inputData = [];
  // inputData = ELEMENT_DATA;
  topActions = TOPACTIONSBUTTON;
  dataTable;
  dialogRef;
  columnNameToDisplayOnDelete = ['cnpj', 'razaoSocial'];
  statusColors = {
    1: { background: 'red', color: 'white' },
    2: { background: 'blue', color: 'white' },
    3: { background: 'yellow', color: 'white' },
    4: { background: '#eaeaea', color: 'black' }
  };

  trueFalseColors = {
    true: { background: 'red', color: 'white' },
    false: { background: 'blue', color: 'white' }
  };

  yesNoColors = {
    yes: { background: 'red', color: 'white' },
    no: { background: 'blue', color: 'white' },
    sim: { background: 'yellow', color: 'white' },
    nao: { background: '#eaeaea', color: 'black' }
  };

  private count = 1;

  constructor(
    private _companyService: CompanyService,
    private dataTableService: DataTableService,
    private dialogService: DialogService,
    private toastService: ToastrService
  ) {}

  showToast(type) {
    /* this.toastService.show({
      text: `Toast message ${this.count}`,
      type: type,
    }); */
    switch (type) {
      case 'success':
        this.toastService.success('Teste de notificação sucesso.');
        break;
      case 'info':
        this.toastService.info('Teste de notificação informativa.');
        break;
      case 'error':
        this.toastService.error('Teste de notificação erro.');
        break;
      case 'warning':
        this.toastService.warn('Teste de notificação warning.');
        break;
      case 'clear':
        this.toastService.clear();
        break;
      default:
        break;
    }

    this.count += 1;
  }
  ngOnInit() {
    this.dataTableService.buttonRowEvent.subscribe(eventType => {
      if (eventType.event === 'confirmdelete') {
        console.log('confirmdelete: ', eventType);
      }

      if (eventType.event === 'visualizar') {
        this.dialogService.openDialog(CompanyViewEditComponent, {
          name: 'animal teste nome',
          animal: 'animal teste'
        });
      }
    });

    this.dataTableService.afterRemoveRow.subscribe(() => console.log('After Remove Event'));

    this.dataTableService.topButtonEvent.subscribe(eventSlug => {
      console.log('TopButtonAction: ', eventSlug);
    });

    this.dataTableService.filterLimparEvent.subscribe(() => {
      console.log('Botão Limpar Filtro Clicado');
    });

    this.dataTableService.filterPesquisarEvent.subscribe(() => {
      console.log('Botão Pesquisar Filtro Clicado');
    });

    /* this._companyService.get().subscribe(inputData => {
      this.dataTableService.setInputData(inputData);
    }); */
  }

  ngAfterViewInit() {
    this.dataTableService.setInputData(ELEMENT_DATA);
  }

  getPaging(element) {
    console.log('empresa: ', element);
  }
}
