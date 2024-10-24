import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'


async function bootstrap()
{
    const app = await NestFactory.create(AppModule)
    const logger = new Logger('Bootstrap')

    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    app.enableCors({ origin: '*' })

    const options = new DocumentBuilder()
        .setTitle('Administracion')
        .setDescription('Panel administrativo de usuarios')
        .setVersion('1.0')
        .addTag('administracion')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)

    await app.listen(process.env.PORT || 3000)
    logger.log(`App running on port ${process.env.PORT}`)
}


bootstrap()
