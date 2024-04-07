import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

@Injectable()
export class CacheConfig implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createCacheOptions(): Promise<CacheModuleOptions> {
    const ttl = this.configService.get<number>('jwt.refresh.time') * 1000;

    return this.configService.get<boolean>('testing')
      ? { ttl }
      : {
          store: await redisStore({
            ...this.configService.get('redis'),
            ttl,
          }),
        };
  }
}

// TypeOrmModule.forRoot({
//   type: "mongodb",
// host: "127.0.0.1",
// port: 27017,
// database: "app",
//   synchronize: true,
//   entities: [Post],
// useUnifiedTopology: true,
// useNewUrlParser: true,
// }),
// {
//   "type": "mongodb",
//   // Hostname of the MongoDB server
//   "host": "cluster0-shard-00-02-xxxxx.mongodb.net",
//   // Port number for MongoDB connection
//   "port": 27017,
//   // Username for authenticating with MongoDB
//   "username": "root",
//   // Password for authenticating with MongoDB Atlas
//   "password": "password",
//   // Name of the database to connect to
//   "database": "name-database",
//   // Whether to synchronize database schema with entities
//   "synchronize": true,
//   // Your entities
//   "entities": [],

//   // Extra driver options for MongoDB connection
//   "driverExtra": {
//     // Enable SSL for secure communication
//     "ssl": true,
//     // database authentication source for connecting to MongoDB
//     "authSource": "admin"
//   }
// }

// {
//   //MongoDB, in this case
//   type: "mongodb",
//   // Connection URL for MongoDB Atlas
//   // Ensure you have the username, password, cluster information, and database name
//   url: "mongodb+srv:xxxxcluster0-xxxx-xxxx-xxxx.mongodb.netXXXx",
//   // Whether to use the new connection parser
//   useNewUrlParser: true,
//   synchronize: true,
//   // Enable logging for database operations
//   logging: true,
//   // The authentication source
//   authSource: "admin",
//   entities: []
// }
