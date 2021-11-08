import { Module } from '@nestjs/common';
import { ClienteGateway } from './cliente/cliente.gateway';
import { AppService } from '../app.service';

@Module({
    providers: [ClienteGateway, AppService],
})

export class WebSocketModule { }
