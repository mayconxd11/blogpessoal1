import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('testes dos moduloes usuarios e auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

	beforeAll(async () => {
    	const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: 'mysql',
					host: 'localhost',
					port: 3306,
					username: 'root',
					password: 'root',
					database: 'db_blogpessoal_test',
					autoLoadEntities: true,
					synchronize: true,
					logging: false,
					dropSchema: true
				}),
				AppModule
			],
    	}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('01 - Deve Cadastrar Usuário', async () => {

		const resposta = await request(app.getHttpServer()) // está pegando o meu servidor e está passando para a variável resposta
		.post('/usuario/cadastrar')
		.send({
			nome: 'root',
			usuario: 'root@root.com',
			senha: 'rootroot',
			foto: ' '
		})
		expect(201),
		
		usuarioId = resposta.body.id
	})

	it('02 - Deve Autenticar Usuario (Login)', async () => {

		const resposta = await request(app.getHttpServer())
		.post('/auth/logar')
		.send({
			usuario: 'root@root.com',
			senha: 'rootroot',
		});
		expect(200)

		token = resposta.body.token;
	})

	it('03 - Não Deve Duplicar o Usuario', async () => {

		request(app.getHttpServer())
		.post('/usuarios/cadastrar')
		.send({
			nome: 'root',
			uruario: 'root@root.com',
			senha: 'rootroot',
			foto: ' '
		})
		.expect(400)
	})

	it('04 - Deve Listar Todos os Usuários', async () => {
		
		request(app.getHttpServer())
		.get('/usuarios/all')
		.set('Authorization', `${token}`)
		.send({})
		.expect(200)
	});

	it('05 - Deve Atualizar um Usuário', async () => {
		request(app.getHttpServer())
		.put('/usuarios/atualizar')
		.set('Authorization', `${token}`)
		.send({
			id: usuarioId,
			nome: 'Root atualizado',
			usuario: 'root@root.com',
			senha: 'rootroot',
			foto: ' '
		})
		.then(resposta => {
			expect('Root atualizado').toEqual(resposta.body.nome);
		})
		expect(200)
	})
});