import Pool, { QueryResult } from "@common/database";
import { Vehicle } from "./vehicle.model";
import MysqlException from "@common/exceptions/mysql.exception";
class VehicleDao {
    /**
     * @description:
     * @param {Vehicle} vehicle
     * @returns {Promise<void>} 
     */
    public static readonly createVehicle = async (vehicle: Vehicle): Promise<void> => {
        const queryCreateVehicle: string = `
            INSERT INTO traxi.vehicle (
                vim, 
                noEconomico, 
                placa, 
                noAsiento, 
                seguro, 
                noSeguro, 
                marca, 
                modelo, 
                anio, 
                color
            ) VALUES (
                :vim, 
                :noEconomico, 
                :placa, 
                :noAsiento, 
                :seguro, 
                :noSeguro, 
                :marca, 
                :modelo, 
                :anio, 
                :color
            );
        `;

        try {
            await Pool.query(queryCreateVehicle, vehicle);
        } catch (error) {
            throw new MysqlException('createVehicle', (error as Error).message);
        }
    }

    /**
     * @description:
     * @returns {Promise<Vehicle | null>}
     */
    public static readonly getVehicles = async(): Promise<Vehicle[] | null> => {
        let rows: QueryResult;

        const queryGetVehicles: string = `
            SELECT
                vim,
                noEconomico,
                marca,
                modelo,
                anio,
                color,
                estatus
            FROM traxi.vehicle;
        `;

        try {
            [rows] = await Pool.query(queryGetVehicles);
        } catch (error) {
            throw new MysqlException('getVehicles', (error as Error).message);
        }

        if ( Object.keys(rows).length === 0 ) return null;

        return rows as Vehicle[];
    }

    /**
     * @description:
     * @param {string} vim
     * @returns {Promise<Vehicle | null>}
     */
    public static readonly getVehicleDetail = async (vim: string): Promise<Vehicle | null> => {
        let rows: QueryResult;

        const queryGetVehicleDetail: string = `
            SELECT * FROM traxi.vehicle WHERE vim = :vim;
        `;

        try {
            [rows] = await Pool.query(queryGetVehicleDetail, { vim });
        } catch (error) {
            throw new MysqlException('getVehicleDetail', (error as Error).message);
        }

        if ( Object.keys(rows).length === 0 ) return null;

        return rows[0] as Vehicle;
    }

    /**
     * @description: 
     * @param {Vehicle} vehicle
     * @returns {Promise<void>} 
     */
    public static readonly updateVehicle = async (vehicle: Vehicle): Promise<void> => {
        const queryUpdateVehicle: string = `
            UPDATE traxi.vehicle SET noEconomico = :noEconomico, 
                placa = :placa,
                noAsiento =:noAsiento,
                seguro = :seguro,
                noSeguro = :noSeguro,
                marca = :marca,
                modelo = :modelo,
                anio = :anio,
                color = :color
            WHERE vim = :vim;
        `;

        try {
            await Pool.query(queryUpdateVehicle, vehicle);
        } catch (error) {
            throw new MysqlException('updateVehicle', (error as Error).message);
        }
    }

    /**
     * @description:
     * @param {string} vim
     * @returns {Promise<void>}
     */
    public static readonly updateVehicleStatus = async (vim: string): Promise<void> => {
        const queryUpdateVehicleStatus: string = `
            UPDATE traxi.vehicle SET estatus = !estatus
                WHERE vim = :vim;
        `;

        try {
            await Pool.query(queryUpdateVehicleStatus, { vim });
        } catch (error) {
            throw new MysqlException('updateVehicleStatus', (error as Error).message);
        }
    }

    /**
     * @description:
     * @param {string} vim
     * @returns {Promise<void>}
     */
    public static readonly deleteVehicle = async (vim: string): Promise<void> => {
        const queryDeleteVehicle: string = `
            DELETE FROM traxi.vehicle WHERE vim = :vim;
        `;

        try {
            await Pool.query(queryDeleteVehicle, { vim });
        } catch (error) {
            throw new MysqlException('deleteVehicle', (error as Error).message);
        }
    }
}

export default VehicleDao;