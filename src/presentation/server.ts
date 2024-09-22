
import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
); 

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
); 

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
); 

const emailService = new EmailService();

export class Server {

    public static async start() {

        console.log('Server started...');

        // Mandar email

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(
        //     ['jpbetancourt13@gmail.com', 'juanbetancourt0013@gmail.com']
        // )
        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs(
        //     ['jpbetancourt13@gmail.com', 'juanbetancourt0013@gmail.com']
        // )

        // const logs = await logRepository.getLogs( LogSeverityLevel.high );
        // console.log(logs);

        CronService.createJob(
            '*/3 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckServiceMultiple(
                    [ fsLogRepository, postgresLogRepository, mongoLogRepository ],
                    () => console.log( `${ url } is ok` ),
                    ( error ) => console.log( error ),
                ).execute( url );
            }
        );
    
    }

}