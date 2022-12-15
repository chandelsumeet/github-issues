import { Chip, Stack } from "@mui/material";
const ChipComponent = ({ labels }: any) => {
  console.log(labels);
  return (
    <>
      <Stack direction="row" spacing={1}>
        {labels &&
          labels.map((item: any) => (
            <Chip
              size="small"
              key={item.id}
              label={item?.name}
              sx={{ background: `#${item?.color}` }}
            />
          ))}
      </Stack>
    </>
  );
};

export default ChipComponent;
