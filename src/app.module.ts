import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/post/post.module';
import { UsersModule } from './modules/users/users.module';
import { config } from 'dotenv';
import { AuthModule } from './authenticate/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from "./modules/category/category.module";
config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.MAIN_DB_HOST,
      port: Number(process.env.MAIN_DB_PORT),
      username: process.env.MAIN_DB_USER,
      password: process.env.MAIN_DB_PASSWORD,
      database: process.env.MAIN_DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
