export interface SdtrecetaspacappProps {
	SolMatDocNum: number;
	AreHosDes: string;
	ServHosDes: string;
	PerAsisNomC: string;
	Fecha: string;
	Productos: SdtRecetasPacAppItemProductosProps;
}
export interface SdtRecetasPacAppItemProps {
	ProdName: string;
	ProdInd: string;
	ProdCant: number;
	ProdViaAdm: string;
	ProdDosis: string;
}
export interface SdtRecetasPacAppItemProductosProps {
	"sdtRecetasPacApp.sdtRecetasPacAppItem.producto": SdtRecetasPacAppItemProps[];
}

