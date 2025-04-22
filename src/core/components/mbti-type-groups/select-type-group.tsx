'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/core/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/core/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/core/components/ui/popover';
import { MBTIType } from '@/core/types/mbti';
import { MBTITypeGroupMapTranslation } from '@/core/types/translation';
import { cn } from '@/core/utils/common';

type SelectTypeGroupProps = {
  typeGroupMap: Map<string, MBTIType[]>;
  typeGroupMapTranslation: MBTITypeGroupMapTranslation;
  activeGroupId: string | null;
  onSelect: (groupId: string | null, types: MBTIType[]) => void;
};

const SelectTypeGroup = ({
  activeGroupId,
  typeGroupMap,
  typeGroupMapTranslation,
  onSelect,
}: SelectTypeGroupProps) => {
  const [open, setOpen] = useState(false);
  const [groupId, setGroupId] = useState<string | null>(null);

  const handleUpdateGroupId = (newGroupId: string) => {
    if (newGroupId === groupId) return;

    setGroupId(newGroupId);
    onSelect(newGroupId, typeGroupMap.get(newGroupId) as MBTIType[]);
  };

  const items = useMemo(
    () =>
      Array.from(typeGroupMap.entries()).map(([groupId]) => {
        return {
          value: groupId,
          label:
            typeGroupMapTranslation
              ?.get(groupId)!
              .title.charAt(0)
              .toUpperCase() + groupId.slice(1),
        };
      }),
    [typeGroupMap, typeGroupMapTranslation]
  );

  useEffect(() => {
    setGroupId(activeGroupId);
  }, [activeGroupId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-60 flex justify-between"
        >
          {groupId ? (
            <span className="text-accent-text font-semibold tracking-wide">
              {items.find((item) => item.value === groupId)?.label}
            </span>
          ) : (
            <span className="text-muted">Select group...</span>
          )}
          <ChevronsUpDown className="opacity-40" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <Command>
          {/* <CommandInput placeholder="Search group..." className="h-9" /> */}
          <CommandList>
            <CommandEmpty>No group found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  className={
                    item.value === groupId
                      ? 'text-accent-text font-semibold'
                      : ''
                  }
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    handleUpdateGroupId(currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      item.value === groupId ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectTypeGroup;
