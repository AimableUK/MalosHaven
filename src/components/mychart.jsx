import { ResponsiveTimeRange } from '@nivo/calendar'; // Make sure this is correct, since you're using @nivo/calendar, not @nivo/time-range
import timedata from "../components/data"; // Your data file

// Convert the timedata to the correct format for ResponsiveTimeRange
const formattedData = timedata.map(item => ({
  day: item.day, // Make sure the day is in 'YYYY-MM-DD' format
  value: item.value, // Value representing the metric for that day
}));

const MyResponsiveTimeRange = () => (
  <div style={{ height: '500px' }}>
    <ResponsiveTimeRange
      data={formattedData} // Pass the formatted data
      from="2018-04-01" // Start date
      to="2018-08-12" // End date
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          justify: false,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left',
          translateX: -60,
          translateY: -60,
          symbolSize: 20,
        },
      ]}
    />
  </div>
);

export default MyResponsiveTimeRange;
