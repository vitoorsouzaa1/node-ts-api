import { container } from 'tsyringe';
import bCryptHashProvider from '../HashProvider/implementations/bCryptHash.provider';
import { IHashProvider } from './IHash.provider';

container.registerSingleton<IHashProvider>('HashProvider', bCryptHashProvider);
