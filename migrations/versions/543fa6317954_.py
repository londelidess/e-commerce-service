"""empty message

Revision ID: 543fa6317954
Revises: bb741010fea3
Create Date: 2023-08-10 10:06:12.392236

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '543fa6317954'
down_revision = 'bb741010fea3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', sa.String(), nullable=True))

    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('role')

    # ### end Alembic commands ###
