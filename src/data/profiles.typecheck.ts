/**
 * Проверка типов JSON-профилей при `npm run typecheck`.
 * Этот файл никто не импортирует, в бандл он не попадает.
 */
import type { ProposalProfile } from './profile-schema'
import school from './profiles/school.json'
import service from './profiles/service.json'
import mehanika from './profiles/mehanika.json'
import kontur from './profiles/kontur.json'
import mayakMvp from './profiles/mayak-mvp.json'

const _school: ProposalProfile = school
const _service: ProposalProfile = service
const _mehanika: ProposalProfile = mehanika
const _kontur: ProposalProfile = kontur
const _mayakMvp: ProposalProfile = mayakMvp

void _school
void _service
void _mehanika
void _kontur
void _mayakMvp
