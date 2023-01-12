import React, { useCallback, useState, useMemo } from "react";
import { Dropdown, InfoTooltip } from "@nautilusjs/component-core";
import { PageLoading } from "../../Page";
import { formatMediumDate, translate, titleize } from "../../utils";
import {
  Box,
  Clickable,
  Icon,
  InputGroup,
  Link,
  Pagination,
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableData,
  Text,
} from "@maui/elements";
import debounce from "lodash/debounce";
// import { formatIndicators, useIndicatorsFilter } from './service'
import { typeDisplayMap } from "../../routes/Indicator/Indicator";
import { openModal } from "../../events";
import CampaignIcon from "../CampaignIcon";

const SortIcon = ({ children, column, sort, sortOrder, sortBy }) => {
  if (!sort) {
    return null;
  }
  const iconProps = {
    name: sortOrder === "asc" ? "chevron-top" : "chevron-down",
    marginLeft: "4px",
    fontSize: "16px",
  };

  return (
    <Clickable
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        sort(column);
      }}
    >
      <Box display="flex">
        <Box>{children}</Box>
        {column === sortBy[0] && <Icon {...iconProps} />}
      </Box>
    </Clickable>
  );
};

const ClearIcon = ({ value, eventHandler, emptyValue }) => {
  if (!value) {
    return null;
  }
  return (
    <Clickable
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        eventHandler(emptyValue);
      }}
    >
      <Icon name="times" />
    </Clickable>
  );
};

const ValueInputFilter = ({ value, eventHandler }) => {
  return (
    <InputGroup
      key={new Date().getTime()} // unique key allows underlying value to be rerendered
      size="small"
      width="100%"
      inputProps={{ defaultValue: value || "" }}
      onKeyUp={(e) => eventHandler(e.target.value)}
      slotRight={<ClearIcon value={value} eventHandler={eventHandler} />}
    />
  );
};

const perPageOptions = [25, 50, 100];

const RelevantReports = ({ reports }) => {
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[0]);
  const [sortBy, setSortBy] = useState(["last_seen"]);
  const [sortOrder, setSortOrder] = useState("desc");
  // const [filters, setFilters] = useState()
  // const [search, setSearch] = useState()

  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [reportDate, setReportDate] = useState();

  const debouncedTitle = debounce((value) => {
    setTitle(value);
  }, 500);

  const debouncedType = debounce((value) => {
    setType(value);
  }, 500);

  const debouncedReportDate = debounce((value) => {
    setReportDate(value);
  }, 500);

  const onTableChange = useCallback(
    (e) => {
      if (e) {
        setCurrentPage(e);
        setOffset((e - 1) * perPage);
      }
    },
    [perPage, setOffset]
  );

  const onSortClick = useCallback(
    (sortBy) => {
      if (!sortBy) {
        return;
      }
      const sort = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(sort);
      setSortBy([sortBy]);
    },
    [sortOrder, setSortOrder, setSortBy]
  );

  const theadProps = {
    position: "sticky",
    top: "0",
    textAlign: "left",
    fontSize: "12px",
    lineHeight: "16px",
    verticalAlign: "top",
  };

  const paginationProps = {
    minHeight: "75px",
    gap: "4px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "#52637A solid 1px",
    backgroundColor: "#33445B",
  };

  const total = reports?.length;

  console.log(reports, "reports");

  return (
    <>
      <Table>
        <TableHead>
          <TableRow css={{ textAlign: "left", fontWeight: "bold" }}>
            <TableHeader width="60%" {...theadProps}>
              <SortIcon
                column="value"
                sort={onSortClick}
                sortOrder={sortOrder}
                sortBy={sortBy}
              >
                Reports Title
              </SortIcon>
              <Box marginTop="2px" marginLeft="-2px">
                <ValueInputFilter value={title} eventHandler={debouncedTitle} />
              </Box>
            </TableHeader>
            <TableHeader {...theadProps}>
              Reports Type
              <Box marginTop="2px" marginLeft="-2px">
                <ValueInputFilter value={type} eventHandler={debouncedType} />
              </Box>
            </TableHeader>
            <TableHeader {...theadProps}>
              Published Date
              <Box marginTop="2px" marginLeft="-2px">
                <ValueInputFilter
                  value={reportDate}
                  eventHandler={debouncedReportDate}
                />
              </Box>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((item, i) => (
            <TableRow key={i} style={{ height: "30px", verticalAlign: "top" }}>
              <TableData>{item.name}</TableData>
              <TableData>{item.reportType}</TableData>
              <TableData>{formatMediumDate(item.date)}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* { (!indicatorData?.indicators || indicatorData?.indicators.length < 1) &&
                <Box
                  padding='16px'
                  borderLeft='1px'
                  borderRight='1px'
                  borderLeftStyle='solid'
                  borderLeftColor='colorBorderMain'
                  borderRightStyle='solid'
                  borderRightColor='colorBorderMain'
                  textAlign='center'
                >
                  No matching indicators found
                </Box>
              } */}
      <Box {...paginationProps}>
        {total && (
          <Pagination
            count={total}
            perPage={perPage}
            perPageOptions={perPageOptions}
            setPerPage={(e) => setPerPage(e)}
            page={currentPage}
            setPage={onTableChange}
            hideGoTo={total < perPage}
          />
        )}
      </Box>
    </>
  );
};

export default RelevantReports;
