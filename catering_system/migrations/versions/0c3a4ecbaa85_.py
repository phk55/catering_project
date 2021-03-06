"""empty message

Revision ID: 0c3a4ecbaa85
Revises: f1ddd1038170
Create Date: 2021-01-06 11:44:18.396942

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c3a4ecbaa85'
down_revision = 'f1ddd1038170'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dining_table',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('table_num', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('server_score',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('server', sa.Integer(), nullable=False),
    sa.Column('suggest', sa.Text(), nullable=True),
    sa.Column('create_time', sa.DateTime(), nullable=True),
    sa.Column('table_num_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['table_num_id'], ['dining_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('server_score')
    op.drop_table('dining_table')
    # ### end Alembic commands ###
