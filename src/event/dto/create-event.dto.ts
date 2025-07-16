export class CreateEventDto {
  name: number;
  photo?: string;
  start_date: Date;
  start_time: string;
  finish_date: Date;
  finish_time: string;
  info?: string;
  event_type_id: string;
  human_category_id: string;
  venue_id: string;
  lang_id: string;
  release_date: Date;
}
