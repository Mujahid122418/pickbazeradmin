import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { Slider } from "@ts-types/generated";
// import { getIcon } from "@utils/get-icon";
// import * as typeIcons from "@components/icons/type";
import { ROUTES } from "@utils/routes";
import Image from "next/image";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
    width: 60,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "left",
    render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
  },
  // {
  //   title: "Icon",
  //   dataIndex: "icon",
  //   key: "slug",
  //   align: "center",
  //   render: (icon: string) => {
  //     if (!icon) return null;
  //     return (
  //       <span className="flex items-center justify-center">
  //         {getIcon({
  //           iconList: typeIcons,
  //           iconName: icon,
  //           className: "w-5 h-5 max-h-full max-w-full",
  //         })}
  //       </span>
  //     );
  //   },
  // },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    align: "center",

    render: (image: any, { name }: { name: string }) => {
      if (!image?.thumbnail) return null;

      return (
        <Image
          src={image?.thumbnail ?? "/"}
          alt={name}
          layout="fixed"
          width={24}
          height={24}
          className="rounded overflow-hidden"
        />
      );
    },
  },
  {
    title: "Actions",
    dataIndex: "slug",
    key: "actions",
    align: "right",
    render: (id: string, record: Slider) => (
      <ActionButtons
        id={record.id}
        navigationPath={`${ROUTES.SLIDERS}/edit/${id}`}
        modalActionType="DELETE_SLIDER"
      />
    ),
  },
];

export type IProps = {
  types: Slider[] | undefined;
};

const SliderList = ({ types }: IProps) => {
  return (
    <div className="rounded overflow-hidden shadow mb-8">
      {/* @ts-ignore */}
      <Table columns={columns} data={types} rowKey="id" scroll={{ x: 380 }} />
    </div>
  );
};

export default SliderList;
