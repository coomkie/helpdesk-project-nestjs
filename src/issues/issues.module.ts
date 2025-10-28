import {Module} from '@nestjs/common';
import {IssuesController} from './issues.controller';
import {IssuesService} from './issues.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Issues} from "./issues.entity";
import {Users} from "../users/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Issues, Users])],
    controllers: [IssuesController],
    providers: [IssuesService],
    exports: [IssuesService],
})
export class IssuesModule {
}
