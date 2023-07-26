import {Peso, retiro_en_pesos_sugerido_para_el_mes} from "./src/Code";

describe("Retiro sugerido en pesos para el mes", () => {
    describe("En el ultimo mes del periodo", () => {
        test('Cuando no se va a alcanzar el limite del monotributo, todo el retiro se sugiere en pesos', () => {
            let retiros_anteriores_en_el_periodo: Peso[] = []
            let retiro_total_del_mes: Peso = 10
            let meses_restantes_en_el_periodo: number = 1
            let maximo_de_la_ultima_categoria_monotributo: Peso = 20

            let retiro_sugerido = retiro_en_pesos_sugerido_para_el_mes(
                retiros_anteriores_en_el_periodo,
                retiro_total_del_mes,
                meses_restantes_en_el_periodo,
                maximo_de_la_ultima_categoria_monotributo,
                0
            )
            expect(retiro_sugerido).toBe(retiro_total_del_mes);
        });

        test('Cuando se va a alcanzar el limite del monotributo, el retiro en pesos sugerido es el maximo sin pasarse', () => {
            let retiros_anteriores_en_el_periodo: Peso[] = [10, 10]
            let retiro_total_del_mes: Peso = 10
            let meses_restantes_en_el_periodo: number = 1
            let maximo_de_la_ultima_categoria_monotributo: Peso = 25

            let retiro_sugerido = retiro_en_pesos_sugerido_para_el_mes(
                retiros_anteriores_en_el_periodo,
                retiro_total_del_mes,
                meses_restantes_en_el_periodo,
                maximo_de_la_ultima_categoria_monotributo,
                0
            )
            expect(retiro_sugerido).toBe(5);
        });
    });

    test('Cuando no hay inflacion, y restan varios meses en el periodo, se asumen iguales al mes actual', () => {
        let retiros_anteriores_en_el_periodo: Peso[] = [20]
        let retiro_total_del_mes: Peso = 30
        let meses_restantes_en_el_periodo: number = 2
        let maximo_de_la_ultima_categoria_monotributo: Peso = 40
        // revisar los numeros

        let retiro_sugerido = retiro_en_pesos_sugerido_para_el_mes(
            retiros_anteriores_en_el_periodo,
            retiro_total_del_mes,
            meses_restantes_en_el_periodo,
            maximo_de_la_ultima_categoria_monotributo,
            0
        )
        expect(retiro_sugerido).toBe(10);
    });

    test('Se tiene en cuenta la inflacion del mes siguiente para el retiro sugerido del mes actual', () => {
        let retiros_anteriores_en_el_periodo: Peso[] = [10, 10]
        let retiro_total_del_mes: Peso = 20
        let meses_restantes_en_el_periodo: number = 2
        let maximo_de_la_ultima_categoria_monotributo: Peso = 40
        let inflacion_proyectada_mensual = 0.5;

        let retiro_sugerido = retiro_en_pesos_sugerido_para_el_mes(
            retiros_anteriores_en_el_periodo,
            retiro_total_del_mes,
            meses_restantes_en_el_periodo,
            maximo_de_la_ultima_categoria_monotributo,
            inflacion_proyectada_mensual
        )
        expect(retiro_sugerido).toBe(8);
    });

    test('La inflacion se estima correctamente para varios meses futuros', () => {
        let retiros_anteriores_en_el_periodo: Peso[] = []
        let retiro_total_del_mes: Peso = 10
        let meses_restantes_en_el_periodo: number = 3
        let maximo_de_la_ultima_categoria_monotributo: Peso = 38
        let inflacion_proyectada_mensual = 0.5;

        let retiro_sugerido = retiro_en_pesos_sugerido_para_el_mes(
            retiros_anteriores_en_el_periodo,
            retiro_total_del_mes,
            meses_restantes_en_el_periodo,
            maximo_de_la_ultima_categoria_monotributo,
            inflacion_proyectada_mensual
        )
        expect(retiro_sugerido).toBe(8);
    });
});