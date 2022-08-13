insert into song
(
song_sys_id, 
name, 
description, 
genre, 
instruments, 
bpm, 
length_in_secs, 
is_disabled, 
sys_created_by,
sys_created_on, 
sys_updated_by,
sys_updated_on
)
values 
(
'c487a06ca3b9fdb23e2d7b1792f2a254',
'Sunset Drive', 
'A happy, fun song that uses a piano and orchestra arrangement.', 
'symphonic', 
'strings,brass,winds,percussion,piano',
100,
200,
false,
'system',
NOW(),
'system',
NOW()
);
