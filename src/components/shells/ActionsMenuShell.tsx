~"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  LogOut,
  PlusSquare,
  Settings,
  Share,
  Trash,
  User,
} from "lucide-react";
import { Dots } from "../icons";
import { Button } from "../ui";
import StaggeredDropDown from "../settings/card-settings/settings-dropdown";
import { toast } from "sonner";

const handleSettings = () => {
  toast("not implemented yet");
};

const handleProfile = () => {
  toast("not implemented yet");
};

const handleLogout = () => {
  toast("not implemented yet");
};

const userDropdownOptions = [
  { text: "Settings", icon: Settings, onClick: handleSettings },
  { text: "Profile", icon: User, onClick: handleProfile },
  { text: "Logout", icon: LogOut, onClick: handleLogout },
];

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

// Dropdown Option Component
const DropdownOption = ({ text, Icon, onClick }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={onClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-dropdown-hover text-white hover:bg-dropdown-hover transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

const ActionsMenuShell = ({ options, triggerIcon: TriggerIcon = Dots }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <Button size="icon" onClick={() => setOpen((pv) => !pv)}>
          <TriggerIcon />
        </Button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-dropdown shadow-dark absolute top-[120%] left-[50%] text-white w-48 overflow-hidden"
        >
          {options.map((option, index) => (
            <DropdownOption
              key={index}
              text={option.text}
              Icon={option.icon}
              onClick={() => {
                setOpen(false);
                option.onClick();
              }}
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

// Usage example
const ActionsMenuShellExampleDropdown = () => {
  const dropdownOptions = [
    { text: "Edit", icon: Edit, onClick: () => console.log("Edit clicked") },
    {
      text: "Duplicate",
      icon: PlusSquare,
      onClick: () => console.log("Duplicate clicked"),
    },
    { text: "Share", icon: Share, onClick: () => console.log("Share clicked") },
    {
      text: "Remove",
      icon: Trash,
      onClick: () => console.log("Remove clicked"),
    },
  ];

  return <StaggeredDropDown />;
};

export default ActionsMenuShell;
