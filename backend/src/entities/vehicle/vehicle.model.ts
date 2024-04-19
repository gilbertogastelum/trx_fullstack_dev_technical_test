import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IsNumber, IsString, ValidationError, validate } from "class-validator";
import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";


export interface IVehicle {
    placa: string;
    noEconomico: string;
    vim: string;
    noAsiento: number;
    seguro: string;
    noSeguro: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
}

@ApiModel({
    name: 'Vehicle'
})
export class Vehicle implements IVehicle {
    @IsString()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public placa: string;

    @IsString()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public noEconomico: string;

    @IsString()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public vim: string;

    @IsNumber()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.NUMBER,
        required: true
    })
    public noAsiento: number;

    @IsString()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public seguro: string;

    @IsString()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public noSeguro: string;

    @IsString()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public marca: string;

    @IsString()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public modelo: string;

    @IsString()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public anio: number;

    @IsString()
    @ApiModelProperty({
        description: '',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public color: string;


    constructor(vehicle: IVehicle) {
        Object.assign(this, vehicle);
    }

    public async validateData(vehicle: IVehicle): Promise<void> {
        const errors: ValidationError[] = await validate(vehicle);
        if ( errors.length > 0 ) {
            throw new ClassValidationException(errors);
        }
    }
}