import { Chip, Stack } from "@mui/material";
import { ILabel } from "../../types/Github";
import { addColorClass } from "../../util/addColor";
const ChipComponent = ({ labels }: { labels: ILabel[] }) => {
  return (
    <>
      <Stack direction="row" spacing={1}>
        {labels &&
          labels.map((item: ILabel) => (
            <Chip
              size="small"
              key={item.id}
              label={item?.name}
              className={addColorClass(item?.color)}
              sx={{ background: `#${item?.color}` }}
            />
          ))}
      </Stack>
    </>
  );
};

export default ChipComponent;
