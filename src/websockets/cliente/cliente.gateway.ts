import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { AppService } from '../../app.service';

@WebSocketGateway(3001)

export class ClienteGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  // tslint:disable-next-line:variable-name
  constructor(private readonly _appService: AppService) {
  }

  afterInit(server: any) {
    // tslint:disable-next-line:no-console
    console.log('Init cliente');
  }

  handleConnection(client: any, ...args: any[]) {
    // tslint:disable-next-line:no-console
    console.log('cliente conectado => ', client.id, args);
    this.server.emit('get-bands', this._appService.getBands());
    // client.broadcast.emit('get-bands', this._appService.getBands());
  }

  handleDisconnect(client: any) {
    // tslint:disable-next-line:no-console
    console.log('cliente desconectado', client.id);
  }

  // TODO: eventos para flutter
  @SubscribeMessage('mensaje') // nombre del evento
  crearCliente(client, payload: any) {
    console.log('Entro a cliente gateway', client.id);
    console.log('holi te llego algo del cliente', payload);
    // TODO: envia evento a flutter
    client.broadcast.emit('mensaje-respuesta', { nombre: 'kevin' });
    return { nombre: 'kevin' }; // la peticion
  }

  @SubscribeMessage('add-band') // nombre del evento
  addBand(client, payload: any) {
    this._appService.createBand(payload);
    this.server.emit('get-bands', this._appService.getBands());
    // return this._appService.getBands(); // la peticion
  }

  @SubscribeMessage('vote-band') // nombre del evento
  getBands(client, payload: any) {
    this._appService.voteBand(payload.id);
    this.server.emit('get-bands', this._appService.getBands());
  }

  @SubscribeMessage('delete-band') // nombre del evento
  deleteBand(client, payload: any) {
    const bands = this._appService.deleteBands(payload.id);
    this.server.emit('get-bands', bands);
  }
}
