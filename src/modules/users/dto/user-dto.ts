import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  ValidateNested,
  Validate,
  IsNumberString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  InformacaoBancariaDto,
  PrazoFormaPagamentoDto,
  MapeamentoDto,
} from './create-user-dto';
import { ArrayNotEmpty } from 'src/validators';
import { ApiProperty } from '@nestjs/swagger';

export enum TipoUsuario {
  ADMINISTRADOR = 'ADMINISTRADOR',
  PARCEIRO = 'PARCEIRO',
}

export enum TipoLucro {
  PERCENTUAL = 'percentual',
  FIXO = 'fixo',
}

export class LucroDto {
  @ApiProperty()
  @IsEnum(TipoLucro, {
    message: 'Campo tipo lucro inválido',
  })
  @Transform((valor, obj) => (obj.tipo = valor.toLowerCase()))
  tipo: TipoLucro;

  @ApiProperty()
  @IsNumber(
    {},
    {
      message: 'Valor do lucro inválido ou não informado.',
    },
  )
  @Transform((valor, obj) => (obj.valor = parseFloat(valor)))
  valor: Number;
}

export class AtivarUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informar HASH de ativação.',
  })
  hash: string;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'E-mail não informado ou inválido.',
    },
  )
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Senha não informada.',
  })
  senha: string;
}

export class RedefinirUserDto {
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'E-mail não informado ou inválido.',
    },
  )
  email: string;
}

export class AutoCadastroDto {
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'Campo e-mail Inválido.',
    },
  )
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo nome obrigatório.',
  })
  nome: string;
}

export class ParceiroAutorizarDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo prefixo SKU não informado.',
  })
  prefixoSku: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo lucro não informado.',
  })
  @ValidateNested({
    message: 'Campo lucro não informado.',
  })
  @Type(() => LucroDto)
  lucro: LucroDto;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo Informação Bancária não informado.',
  })
  @ValidateNested({
    message: 'Campo Informação Bancária não pode ser vazio.',
  })
  @Type(() => InformacaoBancariaDto)
  informacaoBancaria: InformacaoBancariaDto;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe os dados de forma de pagamento.',
  })
  @ValidateNested({
    message: 'Campo prazo de formas de pagamento não informado.',
  })
  @Type(() => PrazoFormaPagamentoDto)
  prazoFormaPagamento: PrazoFormaPagamentoDto;

  @ApiProperty()
  @Validate(ArrayNotEmpty, {
    message: 'Nenhum mapeamento informado.',
  })
  @ValidateNested({
    message: 'Nenhum mapeamento informado.',
    each: true,
  })
  @Type(() => MapeamentoDto)
  mapeamento: MapeamentoDto[];
}

export class EditarPerfilDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo nome obrigatório.',
  })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo Informação Bancária não informado.',
  })
  @ValidateNested({
    message: 'Campo Informação Bancária não pode ser vazio.',
  })
  @Type(() => InformacaoBancariaDto)
  informacaoBancaria: InformacaoBancariaDto;
}
