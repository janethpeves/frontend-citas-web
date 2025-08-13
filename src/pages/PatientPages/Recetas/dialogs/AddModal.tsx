import { Button } from "primereact/button";
import { SdtRecetasPacAppItemProps } from "../interface/recetas.interface";
import DataTable from "@/components/DataTable/DataTable";

interface AddModalProps {
	data: SdtRecetasPacAppItemProps[] | null;
	onHideModal?: () => void;
}

export const AddModal: React.FC<AddModalProps> = ({ data, onHideModal }) => {
	return (
		<div>
			<DataTable columns={columns} data={data || []} />
			<div>
				<Button onClick={onHideModal}>Aceptar</Button>
			</div>
		</div>
	);
};
const columns = [
	{ header: "Nombre del Producto", field: "ProdName" },
	{ header: "Indicaciones", field: "ProdInd" },
	{ header: "Cantidad", field: "ProdCant" },
	{ header: "Via de Administración", field: "ProdViaAdm" },
	{ header: "Dosis", field: "ProdDosis" },
];
