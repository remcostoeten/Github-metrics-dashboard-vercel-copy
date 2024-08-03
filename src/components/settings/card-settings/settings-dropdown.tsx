"use client";
import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowBigRight,
  BarChart,
  ChevronDown,
  Edit,
  HomeIcon,
  PieChart,
  PlusSquare,
  Share,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui";
import { Dots } from "@/components/icons";

const StaggeredDropDown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <Button size="icon" onClick={() => setOpen((pv) => !pv)}>
          <Dots />
        </Button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-dropdown shadow-dark absolute top-[120%] left-[50%] text-white w-48 overflow-hidden"
        >
          <Option setOpen={setOpen} Icon={Edit} text="Edit" />
          <Option setOpen={setOpen} Icon={PlusSquare} text="Duplicate" />
          <Option setOpen={setOpen} Icon={Share} text="Share" />
          <Option setOpen={setOpen} Icon={Trash} text="Remove" />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, Icon, setOpen }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-dropdown-hover text-white hover:bg-dropdown-hover transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
