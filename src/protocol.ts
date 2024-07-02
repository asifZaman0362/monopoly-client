import { Option } from "./util";

type Player = number;

type Color = "Green" |
  "Red" |
  "Brown" |
  "Blue" |
  "Cyan" |
  "Orange" |
  "Yellow" |
  "Purple";


interface City {
  name: string,
  color: Color,
  building: number
}

export type CellKind = { "City": City } |
  "GotoJail" |
  "Jail" |
  "Go" |
  "CommunityChest" |
{ TrainStation: string } |
  "IncomeTax" |
{ Utility: string } |
  "SuperTax" |
  "Chance" |
  "Parking";

export function isCity(kind: CellKind): kind is { City: City } {
  if (typeof kind == "object")
    return "City" in kind;
  else return false;
}

export function isTrainStation(kind: CellKind): kind is { TrainStation: string } {
  if (typeof kind == "object")
    return "TrainStation" in kind;
  else return false;
}

export function isUtility(kind: CellKind): kind is { Utility: string } {
  if (typeof kind == "object")
    return "Utility" in kind;
  else return false;
}

export function isGotoJail(kind: CellKind): kind is "GotoJail" {
  return typeof kind == "string" && kind == "GotoJail";
}

export function isJail(kind: CellKind): kind is "Jail" {
  return typeof kind == "string" && kind == "Jail";
}

export function isIncomeTax(kind: CellKind): kind is "IncomeTax" {
  return typeof kind == "string" && kind == "IncomeTax";
}

export function isSuperTax(kind: CellKind): kind is "SuperTax" {
  return typeof kind == "string" && kind == "SuperTax";
}

export function isCommunityChest(kind: CellKind): kind is "CommunityChest" {
  return typeof kind == "string" && kind == "CommunityChest";
}

export function isChance(kind: CellKind): kind is "Chance" {
  return typeof kind == "string" && kind == "Chance";
}

export function isParking(kind: CellKind): kind is "Parking" {
  return typeof kind == "string" && kind == "Parking";
}


export interface Cell {
  kind: CellKind,
  pos: number,
  owner: Option<Player>
}

export type Board = Cell[];